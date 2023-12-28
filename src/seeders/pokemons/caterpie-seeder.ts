import { OrmType } from "../../../fastify";
import { AttackEntity, AttackType } from "../../entities/attack-entity";
import { CreatureEntity } from "../../entities/creature-entity";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { ResistanceEntity } from "../../entities/resistence-entity";
import { WeaknessEntity } from "../../entities/weakness-entity";
import { IGraphQLContext } from "../../typescript/interfaces/IGraphQLContext";

const caterpieData = {
  id: "010",
  name: "Caterpie",
  classification: "Worm Pokemon",
  types: ["Bug"],
  resistances: ["Grass", "Fighting", "Ground"],
  weaknesses: ["Fire", "Flying", "Rock"],
  weight: { minimum: 2.54, maximum: 3.26 },
  height: { minimum: 0.26, maximum: 0.34 },
  fleeRate: 0.2,
  maxCP: 367,
  maxHP: 443,
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

export async function seedCaterpiePokemon(orm: OrmType) {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const creatureTypeEntityRepository = orm.getRepository(CreatureTypeEntity);
  const resistanceEntityRepository = orm.getRepository(ResistanceEntity);
  const weaknessEntityRepository = orm.getRepository(WeaknessEntity);
  const attackEntityRepository = orm.getRepository(AttackEntity);

  const caterpieEntity = await creatureEntityRepository.findOne({
    where: { id: caterpieData.id },
  });

  if (!caterpieEntity) {
    let caterpie = new CreatureEntity();
    caterpie.id = caterpieData.id;
    caterpie.name = caterpieData.name;
    caterpie.classification = caterpieData.classification;
    caterpie.weight_minimum = caterpieData.weight.minimum; // Minimum weight in kilograms
    caterpie.weight_maximum = caterpieData.weight.maximum; // Maximum weight in kilograms
    caterpie.height_minimum = caterpieData.height.minimum; // Minimum height in meters
    caterpie.height_maximum = caterpieData.height.maximum; // Maximum height in meters
    caterpie.fleeRate = caterpieData.fleeRate;
    caterpie.maxCP = caterpieData.maxCP;
    caterpie.maxHP = caterpieData.maxHP;

    // Add types
    caterpie.types = [];
    for (const typeName of caterpieData.types) {
      let typeEntity = await creatureTypeEntityRepository.findOne({
        where: { type: typeName },
      });
      if (!typeEntity) {
        typeEntity = new CreatureTypeEntity();
        typeEntity.type = typeName;
        await creatureTypeEntityRepository.save(typeEntity);
      }
      caterpie.types.push(typeEntity);
    }

    // Add resistances
    caterpie.resistances = [];
    for (const resistanceName of caterpieData.resistances) {
      let resistanceEntity = await resistanceEntityRepository.findOne({
        where: { name: resistanceName },
      });
      if (!resistanceEntity) {
        resistanceEntity = new ResistanceEntity();
        resistanceEntity.name = resistanceName;
        await resistanceEntityRepository.save(resistanceEntity);
      }
      caterpie.resistances.push(resistanceEntity);
    }

    // Add weaknesses
    caterpie.weaknesses = [];
    for (const weaknessName of caterpieData.weaknesses) {
      let weaknessEntity = await weaknessEntityRepository.findOne({
        where: { name: weaknessName },
      });
      if (!weaknessEntity) {
        weaknessEntity = new WeaknessEntity();
        weaknessEntity.name = weaknessName;
        await weaknessEntityRepository.save(weaknessEntity);
      }
      caterpie.weaknesses.push(weaknessEntity);
    }

    // Add attacks
    caterpie.attacks = [];
    for (const attackData of [
      ...caterpieData.attacks.fast,
      ...caterpieData.attacks.special,
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
      caterpie.attacks.push(attackEntity);
    }

    await creatureEntityRepository.save(caterpie);
    console.log("Finished seed of Caterpie pokemon!");
  }
}
