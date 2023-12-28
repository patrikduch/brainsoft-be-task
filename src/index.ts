import "reflect-metadata";
import { fastify } from "fastify";
import mercurius, { IResolvers } from "mercurius";
import pino from "pino";
import { renderPlaygroundPage } from "graphql-playground-html";
import { schema } from "./graphql/schema";
import { AppDataSource } from "./data-source";
import { helloResolver } from "./graphql/resolvers/hello-resolver";
import { diContainer, fastifyAwilixPlugin } from "@fastify/awilix";
import TypeOrmExampleService from "./services/typeorm-example-service";
import { asClass, asValue } from "awilix";
import { IGraphQLContext } from "./typescript/interfaces/IGraphQLContext";
import { CreatureEntity } from "./entities/creature-entity";
import {
  getPokemonItemByIdResolver,
  getPokemonsResolver,
  searchPokemonByNameResolver,
} from "./graphql/resolvers/pokemon-resolver";
import PokemonService from "./services/pokemon-service";
import { getPokemonTypesResolver } from "./graphql/resolvers/pokemon-types-resolver";
import { seedCreatureTypes } from "./seeders/pokemon-types-seeder";
import { CreatureTypeEntity } from "./entities/creature-type-entity";
import { WeaknessEntity } from "./entities/weakness-entity";
import { ResistanceEntity } from "./entities/resistence-entity";
import { AttackEntity, AttackType } from "./entities/attack-entity";
import { setFavoritePokemonMutation } from "./graphql/mutations/pokemon-favorite-mutation";
import { EvolutionEntity } from "./entities/evolution-entity";
import { seedIvySaurPokemon } from "./seeders/pokemons/ivysaur-seeder";
import { seedBulbasaurPokemon } from "./seeders/pokemons/bulbasaur-seeder";
import { seedVenusaurPokemon } from "./seeders/pokemons/venusaur-seeder";
import { seedCharmanderPokemon } from "./seeders/pokemons/charmander-seeder";
import { seedCharmeleonPokemon } from "./seeders/pokemons/charmeleon-seeder";
import { seedCharizardPokemon } from "./seeders/pokemons/charizard-seeder";
import { seedSquirtlePokemon } from "./seeders/pokemons/squirtle-seeder";
import { seedWarTortlePokemon } from "./seeders/pokemons/wartortle-seeder";
import { seedBlastoisePokemon } from "./seeders/pokemons/blastoise-seeder";
import { seedCaterpiePokemon } from "./seeders/pokemons/caterpie-seeder";
import { seedMetapodPokemon } from "./seeders/pokemons/metapod-seeder";
import { seedButterfreePokemon } from "./seeders/pokemons/butterfree-seeder";
import { seedWeedlePokemon } from "./seeders/pokemons/weedle-seeder";

const dbConn = require("typeorm-fastify-plugin");

const Port = process.env.PORT || 7000;
const server = fastify({
  logger: pino({ level: "info" }),
});

server
  .register(dbConn, {
    connection: AppDataSource,
  })
  .ready();

// Initialize the connection
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

// Registration of DI container
server.register(fastifyAwilixPlugin, {
  disposeOnClose: true,
  disposeOnResponse: true,
});

// Registration of DI services
diContainer.register({
  logger: asValue(server.log),
  typeOrmExampleService: asClass(TypeOrmExampleService).singleton(),
  pokemonService: asClass(PokemonService).transient(),
});

const resolvers: IResolvers<any, IGraphQLContext> = {
  Mutation: {
    async setFavoritePokemon(_, { pokemonId }, context) {
      return setFavoritePokemonMutation(pokemonId, context);
    },
    addItem: async (_, {}, context) => {
      // await seedCreatureTypes(context);
      await seedBulbasaurPokemon(context);
      await seedIvySaurPokemon(context);
      await seedVenusaurPokemon(context);
      await seedCharmanderPokemon(context);
      await seedCharmeleonPokemon(context);
      await seedCharizardPokemon(context);
      await seedSquirtlePokemon(context);
      await seedWarTortlePokemon(context);
      await seedBlastoisePokemon(context);
      await seedCaterpiePokemon(context);
      await seedMetapodPokemon(context);
      await seedButterfreePokemon(context);
      await seedWeedlePokemon(context);

      return null;
    },
  },
  Query: {
    hello: helloResolver,
    pokemons: async (_, { page = 1, pageSize = 10 }, context) => {
      context.fastify.log.info("pokemons from Patrik Duch");
      return getPokemonsResolver(page, pageSize, context);
    },
    getPokemonById: async (_, { id }, context) => {
      return getPokemonItemByIdResolver(id, context);
    },
    searchByName: async (_, { name }, context) => {
      return searchPokemonByNameResolver(name, context);
    },
    getPokemonTypes: async (_, {}, context) => {
      return getPokemonTypesResolver(context);
    },
  },
};
// GraphQL quering background
server.get("/playground", (_, reply) => {
  reply.header("Content-Type", "text/html");
  reply.send(renderPlaygroundPage({ endpoint: "/graphql" }));
});

server.register(mercurius, {
  schema,
  resolvers,
  context: (_request, _reply) => {
    // Make sure to return the context object with the Fastify instance
    return {
      fastify: server,
    };
  },
});

const start = async () => {
  try {
    await server.listen(Port);
    console.log(`🚀 Server ready at http://localhost:${Port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
