import { AttackEntity } from "../../entities/attack-entity";
import { CreatureEntity } from "../../entities/creature-entity";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { ResistanceEntity } from "../../entities/resistence-entity";
import { WeaknessEntity } from "../../entities/weakness-entity";
import { IGraphQLContext } from "../../typescript/interfaces/IGraphQLContext";

const wartortleData = {
  id: "008",
  name: "Wartortle",
  classification: "Turtle Pokémon",
  types: ["Water"],
  resistances: ["Fire", "Water", "Ice", "Steel"],
  weaknesses: ["Electric", "Grass"],
  weight: { minimum: 19.69, maximum: 25.31 },
  height: { minimum: 0.88, maximum: 1.13 },
  fleeRate: 0.07,
  maxCP: 1435,
  maxHP: 1582,
  attacks: {
    fast: [
      { name: "Bite", type: "Dark", damage: 6 },
      { name: "Water Gun", type: "Water", damage: 6 },
    ],
    special: [
      { name: "Aqua Jet", type: "Water", damage: 25 },
      { name: "Gunk Shot", type: "Poison", damage: 65 },
      { name: "Hydro Pump", type: "Water", damage: 90 },
      { name: "Ice Beam", type: "Ice", damage: 65 },
    ],
  },
};

export async function seedWarTortlePokemon(context: IGraphQLContext) {
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

  const wartortleEntity = await creatureEntityRepository.findOne({
    where: { id: wartortleData.id },
  });

  if (!wartortleEntity) {
    let wartortle = new CreatureEntity();
    wartortle.id = wartortleData.id;
    wartortle.name = wartortleData.name;
    wartortle.classification = wartortleData.classification;
    wartortle.weight_minimum = wartortleData.weight.minimum; // Minimum weight in kilograms
    wartortle.weight_maximum = wartortleData.weight.maximum; // Maximum weight in kilograms
    wartortle.height_minimum = wartortleData.height.minimum; // Minimum height in meters
    wartortle.height_maximum = wartortleData.height.maximum; // Maximum height in meters
    wartortle.fleeRate = wartortleData.fleeRate;
    wartortle.maxCP = wartortleData.maxCP;
    wartortle.maxHP = wartortleData.maxHP;

    await creatureEntityRepository.save(wartortle);
  }
}
