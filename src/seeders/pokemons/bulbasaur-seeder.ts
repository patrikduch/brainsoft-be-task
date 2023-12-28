import { AttackEntity, AttackType } from "../../entities/attack-entity";
import { CreatureEntity } from "../../entities/creature-entity";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { ResistanceEntity } from "../../entities/resistence-entity";
import { WeaknessEntity } from "../../entities/weakness-entity";
import { IGraphQLContext } from "../../typescript/interfaces/IGraphQLContext";

export async function seedBulbasaurPokemon(context: IGraphQLContext) {
  const creatureEntityRepository =
    context.fastify.orm.getRepository(CreatureEntity);

  const creatureTypeEntityRepository =
    context.fastify.orm.getRepository(CreatureTypeEntity);

  const resistanceEntityRepository =
    context.fastify.orm.getRepository(ResistanceEntity);

  const weaknessEntityRepository =
    context.fastify.orm.getRepository(WeaknessEntity);

  const attackEntityRepository =
    context.fastify.orm.getRepository(AttackEntity);

  const bulbasaurEntity = await creatureEntityRepository.findOne({
    where: {
      id: "001",
    },
  });

  if (!bulbasaurEntity) {
    let bulbasaur = new CreatureEntity();
    bulbasaur.id = "001";
    bulbasaur.name = "Bulbasaur";
    bulbasaur.classification = "Seed Pokémon";
    bulbasaur.weight_minimum = 6.04; // Minimum weight in kilograms
    bulbasaur.weight_maximum = 7.76; // Maximum weight in kilograms
    bulbasaur.height_minimum = 0.61; // Minimum height in meters
    bulbasaur.height_maximum = 0.79; // Maximum height in meters
    bulbasaur.fleeRate = 0.1;
    bulbasaur.maxCP = 951;
    bulbasaur.maxHP = 1071;
    bulbasaur.types = [];
    bulbasaur.resistances = [];
    bulbasaur.weaknesses = [];
    bulbasaur.attacks = [];

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
      bulbasaur.types.push(typeEntity);
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
      bulbasaur.resistances.push(resistanceEntity);
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
      bulbasaur.weaknesses.push(weaknessEntity);
    }

    const attacks = [
      {
        name: "Tackle",
        type: "Normal",
        damage: 12,
        attackType: AttackType.Fast,
      },
      {
        name: "Vine Whip",
        type: "Grass",
        damage: 7,
        attackType: AttackType.Fast,
      },
    ];

    for (const attackData of attacks) {
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
      bulbasaur.attacks.push(attackEntity);
    }

    await creatureEntityRepository.save(bulbasaur);
  }
}
