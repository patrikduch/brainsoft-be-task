import { OrmType } from "../../../fastify";
import { AttackEntity, AttackType } from "../../entities/attack-entity";
import { CreatureEntity } from "../../entities/creature-entity";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { ResistanceEntity } from "../../entities/resistence-entity";
import { WeaknessEntity } from "../../entities/weakness-entity";

const charmanderData = {
  id: "004",
  name: "Charmander",
  classification: "Lizard Pokémon",
  types: ["Fire"],
  resistances: ["Fire", "Grass", "Ice", "Bug", "Steel", "Fairy"],
  weaknesses: ["Water", "Ground", "Rock"],
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
        name: "Flame Burst",
        type: "Fire",
        damage: 30,
        attackType: AttackType.Special,
      },
      {
        name: "Flame Charge",
        type: "Fire",
        damage: 25,
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

export async function seedCharmanderPokemon(orm: OrmType) {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const creatureTypeEntityRepository = orm.getRepository(CreatureTypeEntity);
  const resistanceEntityRepository = orm.getRepository(ResistanceEntity);
  const weaknessEntityRepository = orm.getRepository(WeaknessEntity);
  const attackEntityRepository = orm.getRepository(AttackEntity);

  const charmanderEntity = await creatureEntityRepository.findOne({
    where: {
      id: "004",
    },
  });

  if (!charmanderEntity) {
    let charmander = new CreatureEntity();
    charmander.id = "004";
    charmander.name = "Charmander";
    charmander.classification = "Lizard Pokémon";
    charmander.weight_minimum = 7.44;
    charmander.weight_maximum = 9.56;
    charmander.height_minimum = 0.53;
    charmander.height_maximum = 0.68;
    charmander.fleeRate = 0.1;
    charmander.maxCP = 841;
    charmander.maxHP = 955;

    // Add types
    charmander.types = [];
    for (const typeName of charmanderData.types) {
      let typeEntity = await creatureTypeEntityRepository.findOne({
        where: { type: typeName },
      });
      if (!typeEntity) {
        typeEntity = new CreatureTypeEntity();
        typeEntity.type = typeName;
        await creatureTypeEntityRepository.save(typeEntity);
      }
      charmander.types.push(typeEntity);
    }

    // Add resistances
    charmander.resistances = [];
    for (const resistanceName of charmanderData.resistances) {
      let resistanceEntity = await resistanceEntityRepository.findOne({
        where: { name: resistanceName },
      });
      if (!resistanceEntity) {
        resistanceEntity = new ResistanceEntity();
        resistanceEntity.name = resistanceName;
        await resistanceEntityRepository.save(resistanceEntity);
      }
      charmander.resistances.push(resistanceEntity);
    }

    // Add weaknesses
    charmander.weaknesses = [];
    for (const weaknessName of charmanderData.weaknesses) {
      let weaknessEntity = await weaknessEntityRepository.findOne({
        where: { name: weaknessName },
      });
      if (!weaknessEntity) {
        weaknessEntity = new WeaknessEntity();
        weaknessEntity.name = weaknessName;
        await weaknessEntityRepository.save(weaknessEntity);
      }
      charmander.weaknesses.push(weaknessEntity);
    }

    // Add attacks
    charmander.attacks = [];
    for (const attackData of [
      ...charmanderData.attacks.fast,
      ...charmanderData.attacks.special,
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
      charmander.attacks.push(attackEntity);
    }

    await creatureEntityRepository.save(charmander);
    console.log("Finished seed of charmander pokemon!");
  }
}
