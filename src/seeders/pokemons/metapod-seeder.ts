import { AttackEntity } from "../../entities/attack-entity";
import { CreatureEntity } from "../../entities/creature-entity";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { ResistanceEntity } from "../../entities/resistence-entity";
import { WeaknessEntity } from "../../entities/weakness-entity";
import { IGraphQLContext } from "../../typescript/interfaces/IGraphQLContext";

const metapodData = {
  id: "011",
  name: "Metapod",
  classification: "Cocoon Pokémon",
  types: ["Bug"],
  resistances: ["Grass", "Fighting", "Ground"],
  weaknesses: ["Fire", "Flying", "Rock"],
  weight: { minimum: 8.66, maximum: 11.14 },
  height: { minimum: 0.61, maximum: 0.79 },
  fleeRate: 0.09,
  maxCP: 397,
  maxHP: 477,
  attacks: {
    fast: [
      { name: "Bug Bite", type: "Bug", damage: 5 },
      { name: "Tackle", type: "Normal", damage: 12 },
    ],
    special: [{ name: "Struggle", type: "Normal", damage: 15 }],
  },
};

export async function seedMetapodPokemon(context: IGraphQLContext) {
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
  const metapodEntity = await creatureEntityRepository.findOne({
    where: { id: metapodData.id },
  });

  if (!metapodEntity) {
    let metapod = new CreatureEntity();
    metapod.id = metapodData.id;
    metapod.name = metapodData.name;
    metapod.classification = metapodData.classification;
    metapod.weight_minimum = metapodData.weight.minimum; // Minimum weight in kilograms
    metapod.weight_maximum = metapodData.weight.maximum; // Maximum weight in kilograms
    metapod.height_minimum = metapodData.height.minimum; // Minimum height in meters
    metapod.height_maximum = metapodData.height.maximum; // Maximum height in meters
    metapod.fleeRate = metapodData.fleeRate;
    metapod.maxCP = metapodData.maxCP;
    metapod.maxHP = metapodData.maxHP;

    await creatureEntityRepository.save(metapod);
  }
}
