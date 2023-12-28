import { AttackEntity } from "../../entities/attack-entity";
import { CreatureEntity } from "../../entities/creature-entity";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { ResistanceEntity } from "../../entities/resistence-entity";
import { WeaknessEntity } from "../../entities/weakness-entity";
import { IGraphQLContext } from "../../typescript/interfaces/IGraphQLContext";

const caterpieData = {
  id: "010",
  name: "Caterpie",
  classification: "Worm Pokémon",
  types: ["Bug"],
  resistances: ["Grass", "Fighting", "Ground"],
  weaknesses: ["Fire", "Flying", "Rock"],
  weight: { minimum: 2.54, maximum: 3.26 },
  height: { minimum: 0.26, maximum: 0.34 },
  fleeRate: 0.2,
  maxCP: 367,
  maxHP: 443,
  attacks: {
    fast: [
      { name: "Bug Bite", type: "Bug", damage: 5 },
      { name: "Tackle", type: "Normal", damage: 12 },
    ],
    special: [{ name: "Struggle", type: "Normal", damage: 15 }],
  },
};

export async function seedCaterpiePokemon(context: IGraphQLContext) {
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
  const caterpieEntity = await creatureEntityRepository.findOne({
    where: { id: caterpieData.id },
  });

  if (!caterpieEntity) {
    let caterpie = new CreatureEntity();
    caterpie.id = caterpieData.id;
    caterpie.name = caterpieData.name;
    caterpie.classification = caterpieData.classification;
    caterpie.weight_minimum = caterpieData.weight.minimum; // Minimum weight in kilograms
    caterpie.weight_maximum = caterpieData.weight.maximum; // Maximum weight in kilograms
    caterpie.height_minimum = caterpieData.height.minimum; // Minimum height in meters
    caterpie.height_maximum = caterpieData.height.maximum; // Maximum height in meters
    caterpie.fleeRate = caterpieData.fleeRate;
    caterpie.maxCP = caterpieData.maxCP;
    caterpie.maxHP = caterpieData.maxHP;

    await creatureEntityRepository.save(caterpie);
  }
}
