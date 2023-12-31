import { OrmType } from "../../../../fastify";
import { CreatureEntity } from "../../../entities/creature-entity";
import { EvolutionEntity } from "../../../entities/evolution-entity";

export async function seedMetapodPokemonEvolutions(orm: OrmType) {
  await metapodToButterfree(orm);
  console.log("Finished seed of Metapod evolutions");
}
export const metapodToButterfree = async (orm: OrmType) => {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const evolutionEntityRepository = orm.getRepository(EvolutionEntity);

  const metapodEntity = (await creatureEntityRepository.findOne({
    where: {
      name: "Metapod",
    },
    relations: {
      evolutions: true,
    },
  })) as CreatureEntity;

  const butterFreeEntity = (await creatureEntityRepository.findOne({
    where: {
      name: "Butterfree",
    },
  })) as CreatureEntity;

  if (butterFreeEntity && metapodEntity) {
    let evolutionsExists = false;
    metapodEntity.evolutions.forEach((e) => {
      if (e.name == butterFreeEntity.name) {
        evolutionsExists = true;
      }
    });

    if (!evolutionsExists) {
      let evolution = new EvolutionEntity();

      const evolutionEntity = await evolutionEntityRepository.findOne({
        where: {
          name: butterFreeEntity.name,
        },
      });

      if (evolutionEntity) {
        evolution = evolutionEntity;
      }

      evolution.creature = butterFreeEntity;
      evolution.name = butterFreeEntity.name;

      await evolutionEntityRepository.save(evolution);

      metapodEntity.evolutions.push(evolution);
      await creatureEntityRepository.save(metapodEntity);
    }
  }
};
