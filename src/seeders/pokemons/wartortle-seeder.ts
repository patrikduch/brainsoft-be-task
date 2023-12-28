import { OrmType } from "../../../fastify";
import { AttackEntity, AttackType } from "../../entities/attack-entity";
import { CreatureEntity } from "../../entities/creature-entity";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { ResistanceEntity } from "../../entities/resistence-entity";
import { WeaknessEntity } from "../../entities/weakness-entity";

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
      { name: "Bite", type: "Dark", damage: 6, attackType: AttackType.Fast },
      {
        name: "Water Gun",
        type: "Water",
        damage: 6,
        attackType: AttackType.Fast,
      },
    ],
    special: [
      {
        name: "Aqua Jet",
        type: "Water",
        damage: 25,
        attackType: AttackType.Special,
      },
      {
        name: "Gunk Shot",
        type: "Poison",
        damage: 65,
        attackType: AttackType.Special,
      },
      {
        name: "Hydro Pump",
        type: "Water",
        damage: 90,
        attackType: AttackType.Special,
      },
      {
        name: "Ice Beam",
        type: "Ice",
        damage: 65,
        attackType: AttackType.Special,
      },
    ],
  },
};

export async function seedWarTortlePokemon(orm: OrmType) {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const creatureTypeEntityRepository = orm.getRepository(CreatureTypeEntity);
  const resistanceEntityRepository = orm.getRepository(ResistanceEntity);
  const weaknessEntityRepository = orm.getRepository(WeaknessEntity);
  const attackEntityRepository = orm.getRepository(AttackEntity);

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

    // Add types
    wartortle.types = [];
    for (const typeName of wartortleData.types) {
      let typeEntity = await creatureTypeEntityRepository.findOne({
        where: { type: typeName },
      });
      if (!typeEntity) {
        typeEntity = new CreatureTypeEntity();
        typeEntity.type = typeName;
        await creatureTypeEntityRepository.save(typeEntity);
      }
      wartortle.types.push(typeEntity);
    }

    // Add resistances
    wartortle.resistances = [];
    for (const resistanceName of wartortleData.resistances) {
      let resistanceEntity = await resistanceEntityRepository.findOne({
        where: { name: resistanceName },
      });
      if (!resistanceEntity) {
        resistanceEntity = new ResistanceEntity();
        resistanceEntity.name = resistanceName;
        await resistanceEntityRepository.save(resistanceEntity);
      }
      wartortle.resistances.push(resistanceEntity);
    }

    // Add weaknesses
    wartortle.weaknesses = [];
    for (const weaknessName of wartortleData.weaknesses) {
      let weaknessEntity = await weaknessEntityRepository.findOne({
        where: { name: weaknessName },
      });
      if (!weaknessEntity) {
        weaknessEntity = new WeaknessEntity();
        weaknessEntity.name = weaknessName;
        await weaknessEntityRepository.save(weaknessEntity);
      }
      wartortle.weaknesses.push(weaknessEntity);
    }

    // Add attacks
    wartortle.attacks = [];
    for (const attackData of [
      ...wartortleData.attacks.fast,
      ...wartortleData.attacks.special,
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
      wartortle.attacks.push(attackEntity);
    }

    await creatureEntityRepository.save(wartortle);
    console.log("Finished seed of Wartortle pokemon!");
  }
}
