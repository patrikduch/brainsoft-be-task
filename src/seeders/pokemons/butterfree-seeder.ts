import { AttackEntity } from "../../entities/attack-entity";
import { CreatureEntity } from "../../entities/creature-entity";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { ResistanceEntity } from "../../entities/resistence-entity";
import { WeaknessEntity } from "../../entities/weakness-entity";
import { IGraphQLContext } from "../../typescript/interfaces/IGraphQLContext";

const butterfreeData = {
  id: "012",
  name: "Butterfree",
  classification: "Butterfly Pokémon",
  types: ["Bug", "Flying"],
  resistances: ["Grass", "Fighting", "Ground", "Bug"],
  weaknesses: ["Fire", "Electric", "Ice", "Flying", "Rock"],
  weight: { minimum: 28, maximum: 36 },
  height: { minimum: 0.96, maximum: 1.24 },
  fleeRate: 0.06,
  maxCP: 1315,
  maxHP: 1454,
  attacks: {
    fast: [
      { name: "Bug Bite", type: "Bug", damage: 5 },
      { name: "Confusion", type: "Psychic", damage: 15 },
    ],
    special: [
      { name: "Bug Buzz", type: "Bug", damage: 75 },
      { name: "Psychic", type: "Psychic", damage: 55 },
      { name: "Signal Beam", type: "Bug", damage: 45 },
    ],
  },
};

export async function seedButterfreePokemon(context: IGraphQLContext) {
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
  const butterfreeEntity = await creatureEntityRepository.findOne({
    where: { id: butterfreeData.id },
  });

  if (!butterfreeEntity) {
    let butterfree = new CreatureEntity();
    butterfree.id = butterfreeData.id;
    butterfree.name = butterfreeData.name;
    butterfree.classification = butterfreeData.classification;
    butterfree.weight_minimum = butterfreeData.weight.minimum; // Minimum weight in kilograms
    butterfree.weight_maximum = butterfreeData.weight.maximum; // Maximum weight in kilograms
    butterfree.height_minimum = butterfreeData.height.minimum; // Minimum height in meters
    butterfree.height_maximum = butterfreeData.height.maximum; // Maximum height in meters
    butterfree.fleeRate = butterfreeData.fleeRate;
    butterfree.maxCP = butterfreeData.maxCP;
    butterfree.maxHP = butterfreeData.maxHP;

    await creatureEntityRepository.save(butterfree);
  }
}
