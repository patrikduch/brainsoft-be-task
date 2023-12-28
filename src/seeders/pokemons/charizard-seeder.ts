import { OrmType } from "../../../fastify";
import { AttackEntity, AttackType } from "../../entities/attack-entity";
import { CreatureEntity } from "../../entities/creature-entity";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { ResistanceEntity } from "../../entities/resistence-entity";
import { WeaknessEntity } from "../../entities/weakness-entity";

const charizardData = {
  id: "006",
  name: "Charizard",
  classification: "Flame Pokémon",
  types: ["Fire", "Flying"],
  resistances: ["Fire", "Grass", "Fighting", "Bug", "Steel", "Fairy"],
  weaknesses: ["Water", "Electric", "Rock"],
  fleeRate: 0.05, // This should be a number
  maxCP: 2413, // This should be a number
  maxHP: 2542, // This should be a number
  attacks: {
    fast: [
      { name: "Ember", type: "Fire", damage: 10, attackType: AttackType.Fast },
      {
        name: "Wing Attack",
        type: "Flying",
        damage: 9,
        attackType: AttackType.Fast,
      },
    ],
    special: [
      {
        name: "Dragon Claw",
        type: "Dragon",
        damage: 35,
        attackType: AttackType.Special,
      },
      {
        name: "Fire Blast",
        type: "Fire",
        damage: 100,
        attackType: AttackType.Special,
      },
      {
        name: "Flamethrower",
        type: "Fire",
        damage: 55,
        attackType: AttackType.Special,
      },
    ],
  },
};
export async function seedCharizardPokemon(orm: OrmType) {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const creatureTypeEntityRepository = orm.getRepository(CreatureTypeEntity);
  const resistanceEntityRepository = orm.getRepository(ResistanceEntity);
  const weaknessEntityRepository = orm.getRepository(WeaknessEntity);
  const attackEntityRepository = orm.getRepository(AttackEntity);

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

    // Add types
    charizard.types = [];
    for (const typeName of charizardData.types) {
      let typeEntity = await creatureTypeEntityRepository.findOne({
        where: { type: typeName },
      });
      if (!typeEntity) {
        typeEntity = new CreatureTypeEntity();
        typeEntity.type = typeName;
        await creatureTypeEntityRepository.save(typeEntity);
      }
      charizard.types.push(typeEntity);
    }

    // Add resistances
    charizard.resistances = [];
    for (const resistanceName of charizardData.resistances) {
      let resistanceEntity = await resistanceEntityRepository.findOne({
        where: { name: resistanceName },
      });
      if (!resistanceEntity) {
        resistanceEntity = new ResistanceEntity();
        resistanceEntity.name = resistanceName;
        await resistanceEntityRepository.save(resistanceEntity);
      }
      charizard.resistances.push(resistanceEntity);
    }

    // Add weaknesses
    charizard.weaknesses = [];
    for (const weaknessName of charizardData.weaknesses) {
      let weaknessEntity = await weaknessEntityRepository.findOne({
        where: { name: weaknessName },
      });
      if (!weaknessEntity) {
        weaknessEntity = new WeaknessEntity();
        weaknessEntity.name = weaknessName;
        await weaknessEntityRepository.save(weaknessEntity);
      }
      charizard.weaknesses.push(weaknessEntity);
    }

    // Add attacks
    charizard.attacks = [];
    for (const attackData of [
      ...charizardData.attacks.fast,
      ...charizardData.attacks.special,
    ]) {
      let attackEntity = await attackEntityRepository.findOne({
        where: { name: attackData.name },
      });
      if (!attackEntity) {
        attackEntity = new AttackEntity();
        attackEntity.name = attackData.name;
        attackEntity.type = attackData.type;
        attackEntity.damage = attackData.damage;
        attackEntity.attackType = attackData.attackType;
        await attackEntityRepository.save(attackEntity);
      }
      charizard.attacks.push(attackEntity);
    }

    await creatureEntityRepository.save(charizard);
    console.log("Finished seed of Charizard pokemon!");
  }
}
