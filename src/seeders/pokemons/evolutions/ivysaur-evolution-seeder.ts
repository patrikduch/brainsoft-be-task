import { OrmType } from "../../../../fastify";
import { CreatureEntity } from "../../../entities/creature-entity";
import { EvolutionEntity } from "../../../entities/evolution-entity";

export async function seedIvysaurEvolutions(orm: OrmType) {
  await ivysaurToVenusaur(orm);
  console.log("Finished seed of Bulbasaur evolutions");
}
const ivysaurToVenusaur = async (orm: OrmType) => {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const evolutionEntityRepository = orm.getRepository(EvolutionEntity);

  const ivysaurEntity = (await creatureEntityRepository.findOne({
    where: {
      name: "Ivysaur",
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

  if (ivysaurEntity && venusaurEntity) {
    let evolutionsExists = false;
    ivysaurEntity.evolutions.forEach((e) => {
      if (e.name == venusaurEntity.name) {
        evolutionsExists = true;
      }
    });

    if (!evolutionsExists) {
      const evolutionExists = await evolutionEntityRepository.findOne({
        where: {
          name: venusaurEntity.name,
        },
      });

      if (!evolutionExists) {
        const evolution = new EvolutionEntity();
        evolution.creature = venusaurEntity;
        evolution.name = venusaurEntity.name;
        await evolutionEntityRepository.save(evolution);
      }

      const evolution = (await evolutionEntityRepository.findOne({
        where: {
          name: venusaurEntity.name,
        },
      })) as EvolutionEntity;

      if (!evolution) {
        ivysaurEntity.evolutions.push(evolution);
      }

      await creatureEntityRepository.save(ivysaurEntity);
    }
  }
};
