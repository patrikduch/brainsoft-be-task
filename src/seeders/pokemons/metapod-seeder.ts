import { OrmType } from "../../../fastify";
import { AttackEntity, AttackType } from "../../entities/attack-entity";
import { CreatureEntity } from "../../entities/creature-entity";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { ResistanceEntity } from "../../entities/resistence-entity";
import { WeaknessEntity } from "../../entities/weakness-entity";

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
      { name: "Bug Bite", type: "Bug", damage: 5, attackType: AttackType.Fast },
      {
        name: "Tackle",
        type: "Normal",
        damage: 12,
        attackType: AttackType.Fast,
      },
    ],
    special: [
      {
        name: "Struggle",
        type: "Normal",
        damage: 15,
        attackType: AttackType.Special,
      },
    ],
  },
};

export async function seedMetapodPokemon(orm: OrmType) {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const creatureTypeEntityRepository = orm.getRepository(CreatureTypeEntity);
  const resistanceEntityRepository = orm.getRepository(ResistanceEntity);
  const weaknessEntityRepository = orm.getRepository(WeaknessEntity);
  const attackEntityRepository = orm.getRepository(AttackEntity);

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

    // Add types
    metapod.types = [];
    for (const typeName of metapodData.types) {
      let typeEntity = await creatureTypeEntityRepository.findOne({
        where: { type: typeName },
      });
      if (!typeEntity) {
        typeEntity = new CreatureTypeEntity();
        typeEntity.type = typeName;
        await creatureTypeEntityRepository.save(typeEntity);
      }
      metapod.types.push(typeEntity);
    }

    // Add resistances
    metapod.resistances = [];
    for (const resistanceName of metapodData.resistances) {
      let resistanceEntity = await resistanceEntityRepository.findOne({
        where: { name: resistanceName },
      });
      if (!resistanceEntity) {
        resistanceEntity = new ResistanceEntity();
        resistanceEntity.name = resistanceName;
        await resistanceEntityRepository.save(resistanceEntity);
      }
      metapod.resistances.push(resistanceEntity);
    }

    // Add weaknesses
    metapod.weaknesses = [];
    for (const weaknessName of metapodData.weaknesses) {
      let weaknessEntity = await weaknessEntityRepository.findOne({
        where: { name: weaknessName },
      });
      if (!weaknessEntity) {
        weaknessEntity = new WeaknessEntity();
        weaknessEntity.name = weaknessName;
        await weaknessEntityRepository.save(weaknessEntity);
      }
      metapod.weaknesses.push(weaknessEntity);
    }

    // Add attacks
    metapod.attacks = [];
    for (const attackData of [
      ...metapodData.attacks.fast,
      ...metapodData.attacks.special,
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
      metapod.attacks.push(attackEntity);
    }

    await creatureEntityRepository.save(metapod);
    console.log("Finished seed of Metapod pokemon!");
  }
}
