import { AttackEntity } from "../../entities/attack-entity";
import { CreatureEntity } from "../../entities/creature-entity";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { ResistanceEntity } from "../../entities/resistence-entity";
import { WeaknessEntity } from "../../entities/weakness-entity";
import { IGraphQLContext } from "../../typescript/interfaces/IGraphQLContext";

const squirtleData = {
  id: "007",
  name: "Squirtle",
  classification: "Tiny Turtle Pokémon",
  types: ["Water"],
  resistances: ["Fire", "Water", "Ice", "Steel"],
  weaknesses: ["Electric", "Grass"],
  weight: { minimum: 7.88, maximum: 10.13 },
  height: { minimum: 0.44, maximum: 0.56 },
  fleeRate: 0.1,
  maxCP: 891,
  maxHP: 1008,
  attacks: {
    fast: [
      { name: "Bubble", type: "Water", damage: 25 },
      { name: "Tackle", type: "Normal", damage: 12 },
    ],
    special: [
      { name: "Aqua Jet", type: "Water", damage: 25 },
      { name: "Aqua Tail", type: "Water", damage: 45 },
      { name: "Water Pulse", type: "Water", damage: 35 },
    ],
  },
};

export async function seedSquirtlePokemon(context: IGraphQLContext) {
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

  const squirtleEntity = await creatureEntityRepository.findOne({
    where: { id: squirtleData.id },
  });

  if (!squirtleEntity) {
    let squirtle = new CreatureEntity();
    squirtle.id = squirtleData.id;
    squirtle.name = squirtleData.name;
    squirtle.classification = squirtleData.classification;
    squirtle.weight_minimum = 7.88; // Minimum weight in kilograms
    squirtle.weight_maximum = 10.13; // Maximum weight in kilograms
    squirtle.height_minimum = 0.44; // Minimum height in meters
    squirtle.height_maximum = 0.56; // Maximum height in meters
    squirtle.fleeRate = squirtleData.fleeRate;
    squirtle.maxCP = squirtleData.maxCP;
    squirtle.maxHP = squirtleData.maxHP;

    await creatureEntityRepository.save(squirtle);
  }
}
