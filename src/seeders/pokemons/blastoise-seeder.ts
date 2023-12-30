import { OrmType } from "../../../fastify";
import { AttackEntity, AttackType } from "../../entities/attack-entity";
import { CreatureEntity } from "../../entities/creature-entity";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { ResistanceEntity } from "../../entities/resistence-entity";
import { WeaknessEntity } from "../../entities/weakness-entity";

const blastoiseData = {
  id: "009",
  name: "Blastoise",
  classification: "Shellfish Pokemon",
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
        name: "Flash Cannon",
        type: "Steel",
        damage: 60,
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

export async function seedBlastoisePokemon(orm: OrmType) {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const creatureTypeEntityRepository = orm.getRepository(CreatureTypeEntity);
  const resistanceEntityRepository = orm.getRepository(ResistanceEntity);
  const weaknessEntityRepository = orm.getRepository(WeaknessEntity);
  const attackEntityRepository = orm.getRepository(AttackEntity);

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

    // Add types
    blastoise.types = [];
    for (const typeName of blastoiseData.types) {
      let typeEntity = await creatureTypeEntityRepository.findOne({
        where: { type: typeName },
      });
      if (!typeEntity) {
        typeEntity = new CreatureTypeEntity();
        typeEntity.type = typeName;
        await creatureTypeEntityRepository.save(typeEntity);
      }
      blastoise.types.push(typeEntity);
    }

    // Add resistances
    blastoise.resistances = [];
    for (const resistanceName of blastoiseData.resistances) {
      let resistanceEntity = await resistanceEntityRepository.findOne({
        where: { name: resistanceName },
      });
      if (!resistanceEntity) {
        resistanceEntity = new ResistanceEntity();
        resistanceEntity.name = resistanceName;
        await resistanceEntityRepository.save(resistanceEntity);
      }
      blastoise.resistances.push(resistanceEntity);
    }

    // Add weaknesses
    blastoise.weaknesses = [];
    for (const weaknessName of blastoiseData.weaknesses) {
      let weaknessEntity = await weaknessEntityRepository.findOne({
        where: { name: weaknessName },
      });
      if (!weaknessEntity) {
        weaknessEntity = new WeaknessEntity();
        weaknessEntity.name = weaknessName;
        await weaknessEntityRepository.save(weaknessEntity);
      }
      blastoise.weaknesses.push(weaknessEntity);
    }

    // Add attacks
    blastoise.attacks = [];
    for (const attackData of [
      ...blastoiseData.attacks.fast,
      ...blastoiseData.attacks.special,
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
      blastoise.attacks.push(attackEntity);
    }

    await creatureEntityRepository.save(blastoise);
    console.log("Finished seed of Blastoise pokemon!");
  }
}
