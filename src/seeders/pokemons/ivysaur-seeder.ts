import { AttackEntity } from "../../entities/attack-entity";
import { CreatureEntity } from "../../entities/creature-entity";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { ResistanceEntity } from "../../entities/resistence-entity";
import { WeaknessEntity } from "../../entities/weakness-entity";
import { IGraphQLContext } from "../../typescript/interfaces/IGraphQLContext";

export async function seedIvySaurPokemon(context: IGraphQLContext) {
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

    // Initialize the types array
    ivysaur.types = [];

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
    await creatureEntityRepository.save(ivysaur);
  }
}
