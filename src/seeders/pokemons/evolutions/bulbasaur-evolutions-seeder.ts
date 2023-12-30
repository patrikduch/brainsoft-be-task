import { OrmType } from "../../../../fastify";
import { CreatureEntity } from "../../../entities/creature-entity";
import { EvolutionEntity } from "../../../entities/evolution-entity";

export async function seedBulbasaurPokemonEvolutions(orm: OrmType) {
  await bulbasaurToIvySaur(orm);
  await bulbasaurToVenusaur(orm);
  console.log("Finished seed of Bulbasaur evolutions");
}
export const bulbasaurToIvySaur = async (orm: OrmType) => {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const evolutionEntityRepository = orm.getRepository(EvolutionEntity);

  const bulbasaurEntity = (await creatureEntityRepository.findOne({
    where: {
      name: "Bulbasaur",
    },
    relations: {
      evolutions: true,
    },
  })) as CreatureEntity;

  const ivysaurEntity = (await creatureEntityRepository.findOne({
    where: {
      name: "Ivysaur",
    },
  })) as CreatureEntity;

  if (ivysaurEntity && bulbasaurEntity) {
    let evolutionExists = false;
    bulbasaurEntity.evolutions.forEach((e) => {
      if (e.name == ivysaurEntity.name) {
        evolutionExists = true;
      }
    });

    if (!evolutionExists) {
      const evolution = new EvolutionEntity();

      evolution.creature = ivysaurEntity;
      evolution.name = ivysaurEntity.name;

      await evolutionEntityRepository.save(evolution);

      bulbasaurEntity.evolutions.push(evolution);
      await creatureEntityRepository.save(bulbasaurEntity);
    }
  }
};

const bulbasaurToVenusaur = async (orm: OrmType) => {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const evolutionEntityRepository = orm.getRepository(EvolutionEntity);

  const bulbasaurEntity = (await creatureEntityRepository.findOne({
    where: {
      name: "Bulbasaur",
    },
    relations: {
      evolutions: true,
    },
  })) as CreatureEntity;

  const venusaurEntity = (await creatureEntityRepository.findOne({
    where: {
      name: "Venusaur",
    },
  })) as CreatureEntity;

  if (venusaurEntity && bulbasaurEntity) {
    let evolutionExists = false;
    bulbasaurEntity.evolutions.forEach((e) => {
      if (e.name == venusaurEntity.name) {
        evolutionExists = true;
      }
    });

    if (!evolutionExists) {
      const evolution = new EvolutionEntity();

      evolution.creature = venusaurEntity;
      evolution.name = venusaurEntity.name;

      await evolutionEntityRepository.save(evolution);

      bulbasaurEntity.evolutions.push(evolution);
      await creatureEntityRepository.save(bulbasaurEntity);
    }
  }
};
