import { OrmType } from "../../../fastify";
import { AttackEntity, AttackType } from "../../entities/attack-entity";
import { CreatureEntity } from "../../entities/creature-entity";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { ResistanceEntity } from "../../entities/resistence-entity";
import { WeaknessEntity } from "../../entities/weakness-entity";

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
      { name: "Bug Bite", type: "Bug", damage: 5, attackType: AttackType.Fast },
      {
        name: "Poison Sting",
        type: "Poison",
        damage: 6,
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

export async function seedWeedlePokemon(orm: OrmType) {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const creatureTypeEntityRepository = orm.getRepository(CreatureTypeEntity);
  const resistanceEntityRepository = orm.getRepository(ResistanceEntity);
  const weaknessEntityRepository = orm.getRepository(WeaknessEntity);
  const attackEntityRepository = orm.getRepository(AttackEntity);

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

    // Add types
    weedle.types = [];
    for (const typeName of weedleData.types) {
      let typeEntity = await creatureTypeEntityRepository.findOne({
        where: { type: typeName },
      });
      if (!typeEntity) {
        typeEntity = new CreatureTypeEntity();
        typeEntity.type = typeName;
        await creatureTypeEntityRepository.save(typeEntity);
      }
      weedle.types.push(typeEntity);
    }

    // Add resistances
    weedle.resistances = [];
    for (const resistanceName of weedleData.resistances) {
      let resistanceEntity = await resistanceEntityRepository.findOne({
        where: { name: resistanceName },
      });
      if (!resistanceEntity) {
        resistanceEntity = new ResistanceEntity();
        resistanceEntity.name = resistanceName;
        await resistanceEntityRepository.save(resistanceEntity);
      }
      weedle.resistances.push(resistanceEntity);
    }

    // Add weaknesses
    weedle.weaknesses = [];
    for (const weaknessName of weedleData.weaknesses) {
      let weaknessEntity = await weaknessEntityRepository.findOne({
        where: { name: weaknessName },
      });
      if (!weaknessEntity) {
        weaknessEntity = new WeaknessEntity();
        weaknessEntity.name = weaknessName;
        await weaknessEntityRepository.save(weaknessEntity);
      }
      weedle.weaknesses.push(weaknessEntity);
    }

    // Add attacks
    weedle.attacks = [];
    for (const attackData of [
      ...weedleData.attacks.fast,
      ...weedleData.attacks.special,
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
      weedle.attacks.push(attackEntity);
    }

    await creatureEntityRepository.save(weedle);
    console.log("Finished seed of Weedle pokemon!");
  }
}
