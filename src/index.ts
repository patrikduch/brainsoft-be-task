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
      const creatureEntityRepository =
        context.fastify.orm.getRepository(CreatureEntity);

      const creatureTypeEntityRepository =
        context.fastify.orm.getRepository(CreatureTypeEntity);

      const resistanceEntityRepository =
        context.fastify.orm.getRepository(ResistanceEntity);

      const weaknessEntityRepository =
        context.fastify.orm.getRepository(WeaknessEntity);

      const attackEntityRepository =
        context.fastify.orm.getRepository(AttackEntity);

      const evolutionEntityRepository =
        context.fastify.orm.getRepository(EvolutionEntity);

      // await seedCreatureTypes(context);

      const bulbasaurEntity = await creatureEntityRepository.findBy({
        id: "001",
      });

      //if (!bulbasaurEntity) {
      let bulbasaur = new CreatureEntity();
      bulbasaur.id = "001";
      bulbasaur.name = "Bulbasaur";
      bulbasaur.classification = "Seed Pokémon";
      bulbasaur.weight_minimum = 6.04; // Minimum weight in kilograms
      bulbasaur.weight_maximum = 7.76; // Maximum weight in kilograms
      bulbasaur.height_minimum = 0.61; // Minimum height in meters
      bulbasaur.height_maximum = 0.79; // Maximum height in meters
      bulbasaur.fleeRate = 0.1;
      bulbasaur.maxCP = 951;
      bulbasaur.maxHP = 1071;
      bulbasaur.types = [];
      bulbasaur.resistances = [];
      bulbasaur.weaknesses = [];
      bulbasaur.attacks = [];

      const types = ["Grass", "Poison"];
      for (const typeName of types) {
        let typeEntity = await creatureTypeEntityRepository.findOne({
          where: { type: typeName },
        });
        if (!typeEntity) {
          typeEntity = new CreatureTypeEntity();
          typeEntity.type = typeName;
          await creatureTypeEntityRepository.save(typeEntity);
        }
        bulbasaur.types.push(typeEntity);
      }

      const resistances = ["Water", "Electric", "Grass", "Fighting", "Fairy"];
      for (const resistanceName of resistances) {
        let resistanceEntity = await resistanceEntityRepository.findOne({
          where: { name: resistanceName },
        });
        if (!resistanceEntity) {
          resistanceEntity = new ResistanceEntity();
          resistanceEntity.name = resistanceName;
          await resistanceEntityRepository.save(resistanceEntity);
        }
        bulbasaur.resistances.push(resistanceEntity);
      }

      const weaknesses = ["Fire", "Ice", "Flying", "Psychic"];
      for (const weaknessName of weaknesses) {
        let weaknessEntity = await weaknessEntityRepository.findOne({
          where: { name: weaknessName },
        });
        if (!weaknessEntity) {
          weaknessEntity = new WeaknessEntity();
          weaknessEntity.name = weaknessName;
          await weaknessEntityRepository.save(weaknessEntity);
        }
        bulbasaur.weaknesses.push(weaknessEntity);
      }

      const attacks = [
        {
          name: "Tackle",
          type: "Normal",
          damage: 12,
          attackType: AttackType.Fast,
        },
        {
          name: "Vine Whip",
          type: "Grass",
          damage: 7,
          attackType: AttackType.Fast,
        },
        // Add more attacks as necessary
      ];

      for (const attackData of attacks) {
        let attackEntity = await attackEntityRepository.findOne({
          where: { name: attackData.name },
        });
        if (!attackEntity) {
          attackEntity = new AttackEntity();
          attackEntity.name = attackData.name;
          attackEntity.type = attackData.type; // Set the type of the attack
          attackEntity.damage = attackData.damage; // Set the damage of the attack
          attackEntity.attackType = attackData.attackType; // Set the attack type (Fast or Special)
          await attackEntityRepository.save(attackEntity);
        }
        bulbasaur.attacks.push(attackEntity);
      }

      await creatureEntityRepository.save(bulbasaur);

      return bulbasaur;
      //}

      /*
      const ivySaurEntity = await creatureEntityRepository.findBy({
        id: "002",
      });

      if (!ivySaurEntity) {
        let ivysaur = new CreatureEntity();
        ivysaur.id = "002";
        ivysaur.name = "Ivysaur";
        ivysaur.classification = "Seed Pokémon";
        ivysaur.weight_minimum = 11.38;
        ivysaur.weight_maximum = 14.63;
        ivysaur.height_minimum = 0.88;
        ivysaur.height_maximum = 1.13;
        ivysaur.fleeRate = 0.07;

        // Max CP and HP
        ivysaur.maxCP = 1483; // Maximum Combat Power
        ivysaur.maxHP = 1632; // Maximum Health Points

        // Initialize the types array
        ivysaur.types = [];

        // Add specific types for Ivysaur
        const types = ["Grass", "Poison"];
        for (const typeName of types) {
          let typeEntity = await creatureTypeEntityRepository.findOne({
            where: { type: typeName },
          });
          if (!typeEntity) {
            typeEntity = new CreatureTypeEntity();
            typeEntity.type = typeName;
            await creatureTypeEntityRepository.save(typeEntity);
          }
          ivysaur.types.push(typeEntity);
        }

        await creatureEntityRepository.save(ivysaur);

        return ivysaur;
      }

      /*
      const venusaurEntity = await creatureEntityRepository.findBy({
        id: "003",
      });

      if (!venusaurEntity) {
        let venusaur = new CreatureEntity();
        venusaur.id = "003";
        venusaur.name = "Venusaur";
        venusaur.classification = "Seed Pokémon";
        venusaur.weight_minimum = 87.5; // Minimum weight in kilograms
        venusaur.weight_maximum = 112.5; // Maximum weight in kilograms
        venusaur.height_minimum = 1.75; // Minimum height in meters
        venusaur.height_maximum = 2.25; // Maximum height in meters
        venusaur.fleeRate = 0.05;
        venusaur.maxCP = 2392;
        venusaur.maxHP = 2580;

        await creatureEntityRepository.save(venusaur);
        return venusaur;
      }

     

      const charmanderEntity = await creatureEntityRepository.findBy({
        id: "004",
      });

      if (!charmanderEntity) {
        let charmander = new CreatureEntity();
        charmander.id = "004";
        charmander.name = "Charmander";
        charmander.classification = "Lizard Pokémon";
        charmander.weight_minimum = 7.44; // Minimum weight in kilograms
        charmander.weight_maximum = 9.56; // Maximum weight in kilograms
        charmander.height_minimum = 0.53; // Minimum height in meters
        charmander.height_maximum = 0.68; // Maximum height in meters
        charmander.fleeRate = 0.1;
        charmander.maxCP = 841;
        charmander.maxHP = 955;

        await creatureEntityRepository.save(charmander);
        return charmander;
      }

      */

      return null;
    },
  },
  Query: {
    hello: helloResolver,
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
