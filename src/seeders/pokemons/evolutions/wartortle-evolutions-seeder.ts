import { OrmType } from "../../../../fastify";
import { CreatureEntity } from "../../../entities/creature-entity";
import { EvolutionEntity } from "../../../entities/evolution-entity";

export async function seedWartortlePokemonEvolutions(orm: OrmType) {
  await wartortleToBlastoise(orm);
  console.log("Finished seed of Wartortle evolutions");
}
export const wartortleToBlastoise = async (orm: OrmType) => {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const evolutionEntityRepository = orm.getRepository(EvolutionEntity);
  const wartortleEntity = (await creatureEntityRepository.findOne({
    where: {
      name: "Wartortle",
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

  if (blastoiseEntity && wartortleEntity) {
    let evolutionsExists = false;
    wartortleEntity.evolutions.forEach((e) => {
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

      wartortleEntity.evolutions.push(evolution);
      await creatureEntityRepository.save(wartortleEntity);
    }
  }
};
