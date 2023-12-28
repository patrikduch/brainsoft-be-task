import { OrmType } from "../../../fastify";
import { AttackEntity, AttackType } from "../../entities/attack-entity";
import { CreatureEntity } from "../../entities/creature-entity";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { ResistanceEntity } from "../../entities/resistence-entity";
import { WeaknessEntity } from "../../entities/weakness-entity";

const charmeleonData = {
  id: "005",
  name: "Charmeleon",
  classification: "Flame Pokémon",
  types: ["Fire"],
  weaknesses: ["Water", "Ground", "Rock"],
  weight: { minimum: "16.63kg", maximum: "21.38kg" },
  height: { minimum: "0.96m", maximum: "1.24m" },
  fleeRate: 0.07,
  previousEvolutions: [{ id: 4, name: "Charmander" }],
  evolutionRequirements: { amount: 100, name: "Charmander candies" },
  evolutions: [{ id: 6, name: "Charizard" }],
  maxCP: 1411,
  maxHP: 1557,
  resistances: ["Fire", "Grass", "Ice", "Bug", "Steel", "Fairy"],
  attacks: {
    fast: [
      { name: "Ember", type: "Fire", damage: 10, attackType: AttackType.Fast },
      {
        name: "Scratch",
        type: "Normal",
        damage: 6,
        attackType: AttackType.Fast,
      },
    ],
    special: [
      {
        name: "Fire Punch",
        type: "Fire",
        damage: 40,
        attackType: AttackType.Special,
      },
      {
        name: "Flame Burst",
        type: "Fire",
        damage: 30,
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

export async function seedCharmeleonPokemon(orm: OrmType) {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const creatureTypeEntityRepository = orm.getRepository(CreatureTypeEntity);
  const resistanceEntityRepository = orm.getRepository(ResistanceEntity);
  const weaknessEntityRepository = orm.getRepository(WeaknessEntity);
  const attackEntityRepository = orm.getRepository(AttackEntity);

  const charmeleonEntity = await creatureEntityRepository.findOne({
    where: { id: charmeleonData.id },
  });

  if (!charmeleonEntity) {
    let charmeleon = new CreatureEntity();
    charmeleon.id = charmeleonData.id;
    charmeleon.name = charmeleonData.name;
    charmeleon.classification = charmeleonData.classification;
    charmeleon.weight_minimum = 16.63;
    charmeleon.weight_maximum = 21.38;
    charmeleon.height_minimum = 0.96;
    charmeleon.height_maximum = 1.24;
    charmeleon.fleeRate = charmeleonData.fleeRate;
    charmeleon.maxCP = charmeleonData.maxCP;
    charmeleon.maxHP = charmeleonData.maxHP;

    // Add types
    charmeleon.types = [];
    for (const typeName of charmeleonData.types) {
      let typeEntity = await creatureTypeEntityRepository.findOne({
        where: { type: typeName },
      });
      if (!typeEntity) {
        typeEntity = new CreatureTypeEntity();
        typeEntity.type = typeName;
        await creatureTypeEntityRepository.save(typeEntity);
      }
      charmeleon.types.push(typeEntity);
    }

    // Add resistances
    charmeleon.resistances = [];
    for (const resistanceName of charmeleonData.resistances) {
      let resistanceEntity = await resistanceEntityRepository.findOne({
        where: { name: resistanceName },
      });
      if (!resistanceEntity) {
        resistanceEntity = new ResistanceEntity();
        resistanceEntity.name = resistanceName;
        await resistanceEntityRepository.save(resistanceEntity);
      }
      charmeleon.resistances.push(resistanceEntity);
    }

    // Add weaknesses
    charmeleon.weaknesses = [];
    for (const weaknessName of charmeleonData.weaknesses) {
      let weaknessEntity = await weaknessEntityRepository.findOne({
        where: { name: weaknessName },
      });
      if (!weaknessEntity) {
        weaknessEntity = new WeaknessEntity();
        weaknessEntity.name = weaknessName;
        await weaknessEntityRepository.save(weaknessEntity);
      }
      charmeleon.weaknesses.push(weaknessEntity);
    }

    // Add attacks
    charmeleon.attacks = [];
    for (const attackData of [
      ...charmeleonData.attacks.fast,
      ...charmeleonData.attacks.special,
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
      charmeleon.attacks.push(attackEntity);
    }

    await creatureEntityRepository.save(charmeleon);
    console.log("Finished seed of charmeleon pokemon!");
  }
}
