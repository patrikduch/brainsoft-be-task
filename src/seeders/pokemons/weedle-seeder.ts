import { AttackEntity } from "../../entities/attack-entity";
import { CreatureEntity } from "../../entities/creature-entity";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { ResistanceEntity } from "../../entities/resistence-entity";
import { WeaknessEntity } from "../../entities/weakness-entity";
import { IGraphQLContext } from "../../typescript/interfaces/IGraphQLContext";

const weedleData = {
  id: "013",
  name: "Weedle",
  classification: "Hairy Pokémon",
  types: ["Bug", "Poison"],
  resistances: ["Grass", "Fighting", "Poison", "Bug", "Fairy"],
  weaknesses: ["Fire", "Flying", "Psychic", "Rock"],
  weight: { minimum: 2.8, maximum: 3.6 },
  height: { minimum: 0.26, maximum: 0.34 },
  fleeRate: 0.2,
  maxCP: 372,
  maxHP: 449,
  attacks: {
    fast: [
      { name: "Bug Bite", type: "Bug", damage: 5 },
      { name: "Poison Sting", type: "Poison", damage: 6 },
    ],
    special: [{ name: "Struggle", type: "Normal", damage: 15 }],
  },
};

export async function seedWeedlePokemon(context: IGraphQLContext) {
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

  const weedleEntity = await creatureEntityRepository.findOne({
    where: { id: weedleData.id },
  });

  if (!weedleEntity) {
    let weedle = new CreatureEntity();
    weedle.id = weedleData.id;
    weedle.name = weedleData.name;
    weedle.classification = weedleData.classification;
    weedle.weight_minimum = weedleData.weight.minimum; // Minimum weight in kilograms
    weedle.weight_maximum = weedleData.weight.maximum; // Maximum weight in kilograms
    weedle.height_minimum = weedleData.height.minimum; // Minimum height in meters
    weedle.height_maximum = weedleData.height.maximum; // Maximum height in meters
    weedle.fleeRate = weedleData.fleeRate;
    weedle.maxCP = weedleData.maxCP;
    weedle.maxHP = weedleData.maxHP;

    await creatureEntityRepository.save(weedle);
  }
}
