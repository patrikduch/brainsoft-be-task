import { OrmType } from "../../../../fastify";
import { CreatureEntity } from "../../../entities/creature-entity";
import { EvolutionEntity } from "../../../entities/evolution-entity";

export async function seedSquirtlePokemonEvolutions(orm: OrmType) {
  await squirtleToWartortle(orm);
  await squirtleToBlastoise(orm);
  console.log("Finished seed of Squirtle evolutions");
}
export const squirtleToWartortle = async (orm: OrmType) => {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const evolutionEntityRepository = orm.getRepository(EvolutionEntity);

  const squirtleEntity = (await creatureEntityRepository.findOne({
    where: {
      name: "Squirtle",
    },
    relations: {
      evolutions: true,
    },
  })) as CreatureEntity;

  const wartortleEntity = (await creatureEntityRepository.findOne({
    where: {
      name: "Wartortle",
    },
  })) as CreatureEntity;

  if (squirtleEntity && wartortleEntity) {
    let evolutionsExists = false;
    squirtleEntity.evolutions.forEach((e) => {
      if (e.name == wartortleEntity.name) {
        evolutionsExists = true;
      }
    });

    if (!evolutionsExists) {
      let evolution = new EvolutionEntity();

      const evolutionEntity = await evolutionEntityRepository.findOne({
        where: {
          name: wartortleEntity.name,
        },
      });

      if (evolutionEntity) {
        evolution = evolutionEntity;
      }

      evolution.creature = wartortleEntity;
      evolution.name = wartortleEntity.name;

      await evolutionEntityRepository.save(evolution);

      squirtleEntity.evolutions.push(evolution);
      await creatureEntityRepository.save(squirtleEntity);
    }
  }
};

export const squirtleToBlastoise = async (orm: OrmType) => {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const evolutionEntityRepository = orm.getRepository(EvolutionEntity);

  const squirtleEntity = (await creatureEntityRepository.findOne({
    where: {
      name: "Squirtle",
    },
    relations: {
      evolutions: true,
    },
  })) as CreatureEntity;

  const blastoiseEntity = (await creatureEntityRepository.findOne({
    where: {
      name: "Blastoise",
    },
  })) as CreatureEntity;

  if (squirtleEntity && blastoiseEntity) {
    let evolutionsExists = false;
    squirtleEntity.evolutions.forEach((e) => {
      if (e.name == blastoiseEntity.name) {
        evolutionsExists = true;
      }
    });

    if (!evolutionsExists) {
      let evolution = new EvolutionEntity();

      const evolutionEntity = await evolutionEntityRepository.findOne({
        where: {
          name: blastoiseEntity.name,
        },
      });

      if (evolutionEntity) {
        evolution = evolutionEntity;
      }

      evolution.creature = blastoiseEntity;
      evolution.name = blastoiseEntity.name;

      await evolutionEntityRepository.save(evolution);

      squirtleEntity.evolutions.push(evolution);
      await creatureEntityRepository.save(squirtleEntity);
    }
  }
};
