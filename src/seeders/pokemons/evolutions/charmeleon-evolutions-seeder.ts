import { OrmType } from "../../../../fastify";
import { CreatureEntity } from "../../../entities/creature-entity";
import { EvolutionEntity } from "../../../entities/evolution-entity";

export async function seedCharmeleonPokemonEvolutions(orm: OrmType) {
  await charmeleonToCharizard(orm);
  console.log("Finished seed of Charmeleon evolutions");
}

export const charmeleonToCharizard = async (orm: OrmType) => {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const evolutionEntityRepository = orm.getRepository(EvolutionEntity);

  const charmeleonEntity = (await creatureEntityRepository.findOne({
    where: {
      name: "Charmeleon",
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

  if (charmeleonEntity && charizardEntity) {
    let evolutionsExists = false;
    charmeleonEntity.evolutions.forEach((e) => {
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

      charmeleonEntity.evolutions.push(evolution);
      await creatureEntityRepository.save(charmeleonEntity);
    }
  }
};
