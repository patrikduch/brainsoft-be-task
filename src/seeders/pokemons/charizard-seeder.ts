import { AttackEntity } from "../../entities/attack-entity";
import { CreatureEntity } from "../../entities/creature-entity";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { ResistanceEntity } from "../../entities/resistence-entity";
import { WeaknessEntity } from "../../entities/weakness-entity";
import { IGraphQLContext } from "../../typescript/interfaces/IGraphQLContext";

const charizardData = {
  id: "006",
  name: "Charizard",
  classification: "Flame Pokémon",
  types: ["Fire", "Flying"],
  resistances: ["Fire", "Grass", "Fighting", "Bug", "Steel", "Fairy"],
  weaknesses: ["Water", "Electric", "Rock"],
  weight: { minimum: 79.19, maximum: 101.81 },
  height: { minimum: 1.49, maximum: 1.91 },
  fleeRate: 0.05,
  maxCP: 2413,
  maxHP: 2602,
  attacks: [
    { name: "Ember", type: "Fire", damage: 10, attackType: "Fast" },
    { name: "Wing Attack", type: "Flying", damage: 9, attackType: "Fast" },
    { name: "Dragon Claw", type: "Dragon", damage: 35, attackType: "Special" },
    { name: "Fire Blast", type: "Fire", damage: 100, attackType: "Special" },
    { name: "Flamethrower", type: "Fire", damage: 55, attackType: "Special" },
  ],
};

export async function seedCharizardPokemon(context: IGraphQLContext) {
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

  const charizardEntity = await creatureEntityRepository.findOne({
    where: { id: charizardData.id },
  });

  if (!charizardEntity) {
    let charizard = new CreatureEntity();
    charizard.id = charizardData.id;
    charizard.name = charizardData.name;
    charizard.classification = charizardData.classification;
    charizard.weight_minimum = 79.19; // Minimum weight in kilograms
    charizard.weight_maximum = 101.81; // Maximum weight in kilograms
    charizard.height_minimum = 1.49; // Minimum height in meters
    charizard.height_maximum = 1.91; // Maximum height in meters
    charizard.fleeRate = charizardData.fleeRate;
    charizard.maxCP = charizardData.maxCP;
    charizard.maxHP = charizardData.maxHP;

    await creatureEntityRepository.save(charizard);
  }
}
