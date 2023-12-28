import { AttackEntity } from "../../entities/attack-entity";
import { CreatureEntity } from "../../entities/creature-entity";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { ResistanceEntity } from "../../entities/resistence-entity";
import { WeaknessEntity } from "../../entities/weakness-entity";
import { IGraphQLContext } from "../../typescript/interfaces/IGraphQLContext";
const blastoiseData = {
  id: "009",
  name: "Blastoise",
  classification: "Shellfish Pokémon",
  types: ["Water"],
  resistances: ["Fire", "Water", "Ice", "Steel"],
  weaknesses: ["Electric", "Grass"],
  weight: { minimum: 74.81, maximum: 96.19 },
  height: { minimum: 1.4, maximum: 1.8 },
  fleeRate: 0.05,
  maxCP: 2355,
  maxHP: 2542,
  attacks: {
    fast: [
      { name: "Bite", type: "Dark", damage: 6 },
      { name: "Water Gun", type: "Water", damage: 6 },
    ],
    special: [
      { name: "Flash Cannon", type: "Steel", damage: 60 },
      { name: "Gunk Shot", type: "Poison", damage: 65 },
      { name: "Hydro Pump", type: "Water", damage: 90 },
      { name: "Ice Beam", type: "Ice", damage: 65 },
    ],
  },
};

export async function seedBlastoisePokemon(context: IGraphQLContext) {
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
  const blastoiseEntity = await creatureEntityRepository.findOne({
    where: { id: blastoiseData.id },
  });

  if (!blastoiseEntity) {
    let blastoise = new CreatureEntity();
    blastoise.id = blastoiseData.id;
    blastoise.name = blastoiseData.name;
    blastoise.classification = blastoiseData.classification;
    blastoise.weight_minimum = blastoiseData.weight.minimum; // Minimum weight in kilograms
    blastoise.weight_maximum = blastoiseData.weight.maximum; // Maximum weight in kilograms
    blastoise.height_minimum = blastoiseData.height.minimum; // Minimum height in meters
    blastoise.height_maximum = blastoiseData.height.maximum; // Maximum height in meters
    blastoise.fleeRate = blastoiseData.fleeRate;
    blastoise.maxCP = blastoiseData.maxCP;
    blastoise.maxHP = blastoiseData.maxHP;

    await creatureEntityRepository.save(blastoise);
  }
}
