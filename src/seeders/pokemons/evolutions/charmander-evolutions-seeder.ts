import { OrmType } from "../../../../fastify";
import { CreatureEntity } from "../../../entities/creature-entity";
import { EvolutionEntity } from "../../../entities/evolution-entity";

export async function seedCharmanderPokemonEvolutions(orm: OrmType) {
  await charmanderToCharmeleon(orm);
  await charmanderToCharizard(orm);
  console.log("Finished seed of Charmander evolutions");
}
export const charmanderToCharmeleon = async (orm: OrmType) => {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const evolutionEntityRepository = orm.getRepository(EvolutionEntity);

  const charmanderEntity = (await creatureEntityRepository.findOne({
    where: {
      name: "Charmander",
    },
    relations: {
      evolutions: true,
    },
  })) as CreatureEntity;

  const charmeleonEntity = (await creatureEntityRepository.findOne({
    where: {
      name: "Charmeleon",
    },
  })) as CreatureEntity;

  if (charmanderEntity && charmeleonEntity) {
    let evolutionsExists = false;
    charmanderEntity.evolutions.forEach((e) => {
      if (e.name == charmeleonEntity.name) {
        evolutionsExists = true;
      }
    });

    if (!evolutionsExists) {
      let evolution = new EvolutionEntity();

      const evolutionEntity = await evolutionEntityRepository.findOne({
        where: {
          name: charmeleonEntity.name,
        },
      });

      if (evolutionEntity) {
        evolution = evolutionEntity;
      }

      evolution.creature = charmeleonEntity;
      evolution.name = charmeleonEntity.name;

      await evolutionEntityRepository.save(evolution);

      charmanderEntity.evolutions.push(evolution);
      await creatureEntityRepository.save(charmanderEntity);
    }
  }
};

export const charmanderToCharizard = async (orm: OrmType) => {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const evolutionEntityRepository = orm.getRepository(EvolutionEntity);

  const charmanderEntity = (await creatureEntityRepository.findOne({
    where: {
      name: "Charmander",
    },
    relations: {
      evolutions: true,
    },
  })) as CreatureEntity;

  const charizardEntity = (await creatureEntityRepository.findOne({
    where: {
      name: "Charizard",
    },
  })) as CreatureEntity;

  if (charmanderEntity && charizardEntity) {
    let evolutionsExists = false;
    charmanderEntity.evolutions.forEach((e) => {
      if (e.name == charizardEntity.name) {
        evolutionsExists = true;
      }
    });

    if (!evolutionsExists) {
      let evolution = new EvolutionEntity();

      const evolutionEntity = await evolutionEntityRepository.findOne({
        where: {
          name: charizardEntity.name,
        },
      });

      if (evolutionEntity) {
        evolution = evolutionEntity;
      }

      evolution.creature = charizardEntity;
      evolution.name = charizardEntity.name;

      await evolutionEntityRepository.save(evolution);

      charmanderEntity.evolutions.push(evolution);
      await creatureEntityRepository.save(charmanderEntity);
    }
  }
};
