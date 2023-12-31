import { OrmType } from "../../../../fastify";
import { CreatureEntity } from "../../../entities/creature-entity";
import { EvolutionEntity } from "../../../entities/evolution-entity";

export async function seedCaterpiePokemonEvolutions(orm: OrmType) {
  await caterpieToMetapod(orm);
  await caterpieToButterfree(orm);
  console.log("Finished seed of Caterpie evolutions");
}
export const caterpieToMetapod = async (orm: OrmType) => {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const evolutionEntityRepository = orm.getRepository(EvolutionEntity);

  const caterpieEntity = (await creatureEntityRepository.findOne({
    where: {
      name: "Caterpie",
    },
    relations: {
      evolutions: true,
    },
  })) as CreatureEntity;

  const metapodEntity = (await creatureEntityRepository.findOne({
    where: {
      name: "Metapod",
    },
  })) as CreatureEntity;

  if (caterpieEntity && metapodEntity) {
    let evolutionExists = false;
    caterpieEntity.evolutions.forEach((e) => {
      if (e.name == metapodEntity.name) {
        evolutionExists = true;
      }
    });

    if (!evolutionExists) {
      const evolution = new EvolutionEntity();

      evolution.creature = metapodEntity;
      evolution.name = metapodEntity.name;

      await evolutionEntityRepository.save(evolution);

      caterpieEntity.evolutions.push(evolution);
      await creatureEntityRepository.save(caterpieEntity);
    }
  }
};

export const caterpieToButterfree = async (orm: OrmType) => {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const evolutionEntityRepository = orm.getRepository(EvolutionEntity);

  const caterpieEntity = (await creatureEntityRepository.findOne({
    where: {
      name: "Caterpie",
    },
    relations: {
      evolutions: true,
    },
  })) as CreatureEntity;

  const butterfreeEntity = (await creatureEntityRepository.findOne({
    where: {
      name: "Butterfree",
    },
  })) as CreatureEntity;

  if (caterpieEntity && butterfreeEntity) {
    let evolutionExists = false;
    caterpieEntity.evolutions.forEach((e) => {
      if (e.name == butterfreeEntity.name) {
        evolutionExists = true;
      }
    });

    if (!evolutionExists) {
      const evolution = new EvolutionEntity();

      evolution.creature = butterfreeEntity;
      evolution.name = butterfreeEntity.name;

      await evolutionEntityRepository.save(evolution);

      caterpieEntity.evolutions.push(evolution);
      await creatureEntityRepository.save(caterpieEntity);
    }
  }
};
