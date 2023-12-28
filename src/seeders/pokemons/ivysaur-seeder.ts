import { OrmType } from "../../../fastify";
import { AttackEntity, AttackType } from "../../entities/attack-entity";
import { CreatureEntity } from "../../entities/creature-entity";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { ResistanceEntity } from "../../entities/resistence-entity";
import { WeaknessEntity } from "../../entities/weakness-entity";

export async function seedIvySaurPokemon(orm: OrmType) {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const creatureTypeEntityRepository = orm.getRepository(CreatureTypeEntity);
  const resistanceEntityRepository = orm.getRepository(ResistanceEntity);
  const weaknessEntityRepository = orm.getRepository(WeaknessEntity);
  const attackEntityRepository = orm.getRepository(AttackEntity);

  const ivySaurEntity = await creatureEntityRepository.findOne({
    where: {
      id: "002",
    },
  });

  if (!ivySaurEntity) {
    let ivysaur = new CreatureEntity();
    ivysaur.id = "002";
    ivysaur.name = "Ivysaur";
    ivysaur.classification = "Seed Pokémon";
    ivysaur.weight_minimum = 11.38;
    ivysaur.weight_maximum = 14.63;
    ivysaur.height_minimum = 0.88;
    ivysaur.height_maximum = 1.13;
    ivysaur.fleeRate = 0.07;

    // Max CP and HP
    ivysaur.maxCP = 1483; // Maximum Combat Power
    ivysaur.maxHP = 1632; // Maximum Health Points

    ivysaur.types = [];
    ivysaur.resistances = [];
    ivysaur.weaknesses = [];
    ivysaur.attacks = [];

    // Add specific types for Ivysaur
    const types = ["Grass", "Poison"];
    for (const typeName of types) {
      let typeEntity = await creatureTypeEntityRepository.findOne({
        where: { type: typeName },
      });
      if (!typeEntity) {
        typeEntity = new CreatureTypeEntity();
        typeEntity.type = typeName;
        await creatureTypeEntityRepository.save(typeEntity);
      }
      ivysaur.types.push(typeEntity);
    }

    const resistances = ["Water", "Electric", "Grass", "Fighting", "Fairy"];
    for (const resistanceName of resistances) {
      let resistanceEntity = await resistanceEntityRepository.findOne({
        where: { name: resistanceName },
      });
      if (!resistanceEntity) {
        resistanceEntity = new ResistanceEntity();
        resistanceEntity.name = resistanceName;
        await resistanceEntityRepository.save(resistanceEntity);
      }
      ivysaur.resistances.push(resistanceEntity);
    }

    const weaknesses = ["Fire", "Ice", "Flying", "Psychic"];
    for (const weaknessName of weaknesses) {
      let weaknessEntity = await weaknessEntityRepository.findOne({
        where: { name: weaknessName },
      });
      if (!weaknessEntity) {
        weaknessEntity = new WeaknessEntity();
        weaknessEntity.name = weaknessName;
        await weaknessEntityRepository.save(weaknessEntity);
      }
      ivysaur.weaknesses.push(weaknessEntity);
    }

    const ivysaurAttacks = [
      {
        name: "Razor Leaf",
        type: "Grass",
        damage: 15,
        attackType: AttackType.Fast,
      },
      {
        name: "Vine Whip",
        type: "Grass",
        damage: 7,
        attackType: AttackType.Fast,
      },
    ];

    for (const attackData of ivysaurAttacks) {
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
      ivysaur.attacks.push(attackEntity);
    }

    await creatureEntityRepository.save(ivysaur);
    console.log("Finished seed of Ivysaur pokemon!");
  }
}
