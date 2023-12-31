import "reflect-metadata";
import { fastify } from "fastify";
import mercurius, { IResolvers } from "mercurius";
import pino from "pino";
import { renderPlaygroundPage } from "graphql-playground-html";
import { schema } from "./graphql/schema";
import { AppDataSource } from "./data-source";
import { diContainer, fastifyAwilixPlugin } from "@fastify/awilix";
import TypeOrmExampleService from "./services/typeorm-example-service";
import { asClass, asValue } from "awilix";
import { IGraphQLContext } from "./typescript/interfaces/IGraphQLContext";
import PokemonService from "./services/pokemon-service";
import { getPokemonTypesResolver } from "./graphql/resolvers/pokemons/pokemon-types-resolver";
import {
  setFavoritePokemonMutation,
  unsetFavoritePokemonMutation,
} from "./graphql/mutations/pokemons/pokemon-favorite-mutation";
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
import { favoritePokemonsResolver } from "./graphql/resolvers/pokemons/favorite-pokemons-resolver";
import { getPokemonsResolver } from "./graphql/resolvers/pokemons/get-pokemons-resolver";
import { getPokemonItemByIdResolver } from "./graphql/resolvers/pokemons/pokemon-id-resolver";
import { searchPokemonByNameResolver } from "./graphql/resolvers/pokemons/pokemon-name-search-resolver";
import { getPokemonsTypeResolver } from "./graphql/resolvers/pokemons/pokemon-type-resolver";
import { seedBulbasaurPokemonEvolutions } from "./seeders/pokemons/evolutions/bulbasaur-evolutions-seeder";
import { seedIvysaurEvolutions } from "./seeders/pokemons/evolutions/ivysaur-evolution-seeder";
import { seedCaterpiePokemonEvolutions } from "./seeders/pokemons/evolutions/caterpie-evolutions-seeder";
import { seedMetapodPokemonEvolutions } from "./seeders/pokemons/evolutions/metapod-evolutions-seeder";
import { seedCharmanderPokemonEvolutions } from "./seeders/pokemons/evolutions/charmander-evolutions-seeder";
import { seedCharmeleonPokemonEvolutions } from "./seeders/pokemons/evolutions/charmeleon-evolutions-seeder";
import { seedSquirtlePokemonEvolutions } from "./seeders/pokemons/evolutions/squirtle-evolutions-seeder";
import { seedWartortlePokemonEvolutions } from "./seeders/pokemons/evolutions/wartortle-evolutions-seeder";

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
    unsetFavoritePokemon: async (_, { pokemonId }, context) => {
      return unsetFavoritePokemonMutation(pokemonId, context);
    },
  },
  Query: {
    pokemons: async (_, { page = 1, pageSize = 10 }, context) => {
      return getPokemonsResolver(page, pageSize, context);
    },
    favoritePokemons: async (_, {}, context) => {
      return favoritePokemonsResolver(context);
    },
    getPokemonById: async (_, { id }, context) => {
      return getPokemonItemByIdResolver(id, context);
    },
    searchPokemonByName: async (_, { name }, context) => {
      return searchPokemonByNameResolver(name, context);
    },
    getPokemonsByType: async (_, { typeName }, context) => {
      return getPokemonsTypeResolver(context, typeName);
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

// Run the seed method once Fastify is ready
server.addHook("onReady", async () => {
  try {
    await seedBulbasaurPokemon(server.orm);
    await seedIvySaurPokemon(server.orm);
    await seedVenusaurPokemon(server.orm);
    await seedCharmanderPokemon(server.orm);
    await seedCharmeleonPokemon(server.orm);
    await seedCharizardPokemon(server.orm);
    await seedSquirtlePokemon(server.orm);
    await seedWarTortlePokemon(server.orm);
    await seedBlastoisePokemon(server.orm);
    await seedCaterpiePokemon(server.orm);
    await seedMetapodPokemon(server.orm);
    await seedButterfreePokemon(server.orm);
    await seedWeedlePokemon(server.orm);

    await seedBulbasaurPokemonEvolutions(server.orm);
    await seedIvysaurEvolutions(server.orm);
    await seedCaterpiePokemonEvolutions(server.orm);
    await seedMetapodPokemonEvolutions(server.orm);
    await seedCharmanderPokemonEvolutions(server.orm);
    await seedCharmeleonPokemonEvolutions(server.orm);
    await seedSquirtlePokemonEvolutions(server.orm);
    await seedWartortlePokemonEvolutions(server.orm);

    console.log("Database seeding completed!");
  } catch (error) {
    console.log("Database seeding failed:", error);
  }
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
