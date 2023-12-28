import { OrmType } from "../../../fastify";
import { AttackEntity, AttackType } from "../../entities/attack-entity";
import { CreatureEntity } from "../../entities/creature-entity";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { ResistanceEntity } from "../../entities/resistence-entity";
import { WeaknessEntity } from "../../entities/weakness-entity";

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
      { name: "Bug Bite", type: "Bug", damage: 5, attackType: AttackType.Fast },
      {
        name: "Confusion",
        type: "Psychic",
        damage: 15,
        attackType: AttackType.Fast,
      },
    ],
    special: [
      {
        name: "Bug Buzz",
        type: "Bug",
        damage: 75,
        attackType: AttackType.Special,
      },
      {
        name: "Psychic",
        type: "Psychic",
        damage: 55,
        attackType: AttackType.Special,
      },
      {
        name: "Signal Beam",
        type: "Bug",
        damage: 45,
        attackType: AttackType.Special,
      },
    ],
  },
};

export async function seedButterfreePokemon(orm: OrmType) {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const creatureTypeEntityRepository = orm.getRepository(CreatureTypeEntity);
  const resistanceEntityRepository = orm.getRepository(ResistanceEntity);
  const weaknessEntityRepository = orm.getRepository(WeaknessEntity);
  const attackEntityRepository = orm.getRepository(AttackEntity);

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

    // Add types
    butterfree.types = [];
    for (const typeName of butterfreeData.types) {
      let typeEntity = await creatureTypeEntityRepository.findOne({
        where: { type: typeName },
      });
      if (!typeEntity) {
        typeEntity = new CreatureTypeEntity();
        typeEntity.type = typeName;
        await creatureTypeEntityRepository.save(typeEntity);
      }
      butterfree.types.push(typeEntity);
    }

    // Add resistances
    butterfree.resistances = [];
    for (const resistanceName of butterfreeData.resistances) {
      let resistanceEntity = await resistanceEntityRepository.findOne({
        where: { name: resistanceName },
      });
      if (!resistanceEntity) {
        resistanceEntity = new ResistanceEntity();
        resistanceEntity.name = resistanceName;
        await resistanceEntityRepository.save(resistanceEntity);
      }
      butterfree.resistances.push(resistanceEntity);
    }

    // Add weaknesses
    butterfree.weaknesses = [];
    for (const weaknessName of butterfreeData.weaknesses) {
      let weaknessEntity = await weaknessEntityRepository.findOne({
        where: { name: weaknessName },
      });
      if (!weaknessEntity) {
        weaknessEntity = new WeaknessEntity();
        weaknessEntity.name = weaknessName;
        await weaknessEntityRepository.save(weaknessEntity);
      }
      butterfree.weaknesses.push(weaknessEntity);
    }

    // Add attacks
    butterfree.attacks = [];
    for (const attackData of [
      ...butterfreeData.attacks.fast,
      ...butterfreeData.attacks.special,
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
      butterfree.attacks.push(attackEntity);
    }

    await creatureEntityRepository.save(butterfree);
    console.log("Finished seed of ButterFree pokemon!");
  }
}
