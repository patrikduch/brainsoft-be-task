import { OrmType } from "../../../fastify";
import { AttackEntity, AttackType } from "../../entities/attack-entity";
import { CreatureEntity } from "../../entities/creature-entity";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { ResistanceEntity } from "../../entities/resistence-entity";
import { WeaknessEntity } from "../../entities/weakness-entity";

const venusaurData = {
  id: "003",
  name: "Venusaur",
  classification: "Seed Pokémon",
  types: ["Grass", "Poison"],
  resistances: ["Water", "Electric", "Grass", "Fighting", "Fairy"],
  weaknesses: ["Fire", "Ice", "Flying", "Psychic"],
  attacks: {
    fast: [
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
    ],
    special: [
      {
        name: "Sludge Bomb",
        type: "Poison",
        damage: 55,
        attackType: AttackType.Special,
      },
      {
        name: "Solar Beam",
        type: "Grass",
        damage: 120,
        attackType: AttackType.Special,
      },
    ],
  },
};

export async function seedVenusaurPokemon(orm: OrmType) {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const creatureTypeEntityRepository = orm.getRepository(CreatureTypeEntity);
  const resistanceEntityRepository = orm.getRepository(ResistanceEntity);
  const weaknessEntityRepository = orm.getRepository(WeaknessEntity);
  const attackEntityRepository = orm.getRepository(AttackEntity);

  const venusaurEntity = await creatureEntityRepository.findOne({
    where: {
      id: "003",
    },
  });

  if (!venusaurEntity) {
    let venusaur = new CreatureEntity();
    venusaur.id = "003";
    venusaur.name = "Venusaur";
    venusaur.classification = "Seed Pokémon";
    venusaur.weight_minimum = 87.5; // Minimum weight in kilograms
    venusaur.weight_maximum = 112.5; // Maximum weight in kilograms
    venusaur.height_minimum = 1.75; // Minimum height in meters
    venusaur.height_maximum = 2.25; // Maximum height in meters
    venusaur.fleeRate = 0.05;
    venusaur.maxCP = 2392;
    venusaur.maxHP = 2580;

    // Add types
    venusaur.types = [];
    for (const typeName of venusaurData.types) {
      let typeEntity = await creatureTypeEntityRepository.findOne({
        where: { type: typeName },
      });
      if (!typeEntity) {
        typeEntity = new CreatureTypeEntity();
        typeEntity.type = typeName;
        await creatureTypeEntityRepository.save(typeEntity);
      }
      venusaur.types.push(typeEntity);
    }

    // Add resistances
    venusaur.resistances = [];
    for (const resistanceName of venusaurData.resistances) {
      let resistanceEntity = await resistanceEntityRepository.findOne({
        where: { name: resistanceName },
      });
      if (!resistanceEntity) {
        resistanceEntity = new ResistanceEntity();
        resistanceEntity.name = resistanceName;
        await resistanceEntityRepository.save(resistanceEntity);
      }
      venusaur.resistances.push(resistanceEntity);
    }

    // Add weaknesses
    venusaur.weaknesses = [];
    for (const weaknessName of venusaurData.weaknesses) {
      let weaknessEntity = await weaknessEntityRepository.findOne({
        where: { name: weaknessName },
      });
      if (!weaknessEntity) {
        weaknessEntity = new WeaknessEntity();
        weaknessEntity.name = weaknessName;
        await weaknessEntityRepository.save(weaknessEntity);
      }
      venusaur.weaknesses.push(weaknessEntity);
    }

    // Add attacks
    venusaur.attacks = [];
    for (const attackData of [
      ...venusaurData.attacks.fast,
      ...venusaurData.attacks.special,
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
      venusaur.attacks.push(attackEntity);
    }

    await creatureEntityRepository.save(venusaur);

    console.log("Finished seed of Venusaur pokemon!");
  }
}
