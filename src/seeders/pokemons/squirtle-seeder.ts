import { OrmType } from "../../../fastify";
import { AttackEntity, AttackType } from "../../entities/attack-entity";
import { CreatureEntity } from "../../entities/creature-entity";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { ResistanceEntity } from "../../entities/resistence-entity";
import { WeaknessEntity } from "../../entities/weakness-entity";

const squirtleData = {
  id: "007",
  name: "Squirtle",
  classification: "Tiny Turtle Pokémon",
  types: ["Water"],
  resistances: ["Fire", "Water", "Ice", "Steel"],
  weaknesses: ["Electric", "Grass"],
  weight: { minimum: 7.88, maximum: 10.13 },
  height: { minimum: 0.44, maximum: 0.56 },
  fleeRate: 0.1,
  maxCP: 891,
  maxHP: 1008,
  attacks: {
    fast: [
      {
        name: "Bubble",
        type: "Water",
        damage: 25,
        attackType: AttackType.Fast,
      },
      {
        name: "Tackle",
        type: "Normal",
        damage: 12,
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
        name: "Aqua Tail",
        type: "Water",
        damage: 45,
        attackType: AttackType.Special,
      },
      {
        name: "Water Pulse",
        type: "Water",
        damage: 35,
        attackType: AttackType.Special,
      },
    ],
  },
};
export async function seedSquirtlePokemon(orm: OrmType) {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const creatureTypeEntityRepository = orm.getRepository(CreatureTypeEntity);
  const resistanceEntityRepository = orm.getRepository(ResistanceEntity);
  const weaknessEntityRepository = orm.getRepository(WeaknessEntity);
  const attackEntityRepository = orm.getRepository(AttackEntity);

  const squirtleEntity = await creatureEntityRepository.findOne({
    where: { id: squirtleData.id },
  });

  if (!squirtleEntity) {
    let squirtle = new CreatureEntity();
    squirtle.id = squirtleData.id;
    squirtle.name = squirtleData.name;
    squirtle.classification = squirtleData.classification;
    squirtle.weight_minimum = 7.88; // Minimum weight in kilograms
    squirtle.weight_maximum = 10.13; // Maximum weight in kilograms
    squirtle.height_minimum = 0.44; // Minimum height in meters
    squirtle.height_maximum = 0.56; // Maximum height in meters
    squirtle.fleeRate = squirtleData.fleeRate;
    squirtle.maxCP = squirtleData.maxCP;
    squirtle.maxHP = squirtleData.maxHP;

    // Add types
    squirtle.types = [];
    for (const typeName of squirtleData.types) {
      let typeEntity = await creatureTypeEntityRepository.findOne({
        where: { type: typeName },
      });
      if (!typeEntity) {
        typeEntity = new CreatureTypeEntity();
        typeEntity.type = typeName;
        await creatureTypeEntityRepository.save(typeEntity);
      }
      squirtle.types.push(typeEntity);
    }

    // Add resistances
    squirtle.resistances = [];
    for (const resistanceName of squirtleData.resistances) {
      let resistanceEntity = await resistanceEntityRepository.findOne({
        where: { name: resistanceName },
      });
      if (!resistanceEntity) {
        resistanceEntity = new ResistanceEntity();
        resistanceEntity.name = resistanceName;
        await resistanceEntityRepository.save(resistanceEntity);
      }
      squirtle.resistances.push(resistanceEntity);
    }

    // Add weaknesses
    squirtle.weaknesses = [];
    for (const weaknessName of squirtleData.weaknesses) {
      let weaknessEntity = await weaknessEntityRepository.findOne({
        where: { name: weaknessName },
      });
      if (!weaknessEntity) {
        weaknessEntity = new WeaknessEntity();
        weaknessEntity.name = weaknessName;
        await weaknessEntityRepository.save(weaknessEntity);
      }
      squirtle.weaknesses.push(weaknessEntity);
    }

    // Add attacks
    squirtle.attacks = [];
    for (const attackData of [
      ...squirtleData.attacks.fast,
      ...squirtleData.attacks.special,
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
      squirtle.attacks.push(attackEntity);
    }
    await creatureEntityRepository.save(squirtle);
    console.log("Finished seed of Squirle pokemon!");
  }
}
