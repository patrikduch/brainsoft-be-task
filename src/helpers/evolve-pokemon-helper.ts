import { OrmType } from "../../fastify";
import { CreatureEntity } from "../entities/creature-entity";
import { EvolutionEntity } from "../entities/evolution-entity";

export const evolvePokemonHelper = async (
  orm: OrmType,
  baseCreatureName: string,
  evolvedCreatureName: string
) => {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const evolutionEntityRepository = orm.getRepository(EvolutionEntity);

  const baseCreatureEntity = await creatureEntityRepository.findOne({
    where: { name: baseCreatureName },
    relations: { evolutions: true },
  });

  const evolvedCreatureEntity = await creatureEntityRepository.findOne({
    where: { name: evolvedCreatureName },
  });

  if (baseCreatureEntity && evolvedCreatureEntity) {
    const evolutionExists = baseCreatureEntity.evolutions.some(
      (e) => e.name === evolvedCreatureEntity.name
    );

    if (!evolutionExists) {
      let evolution = await evolutionEntityRepository.findOne({
        where: { name: evolvedCreatureEntity.name },
      });

      if (!evolution) {
        evolution = new EvolutionEntity();
        evolution.creature = evolvedCreatureEntity;
        evolution.name = evolvedCreatureEntity.name;
      }

      // This is the key part where we ensure that we're not creating a new record
      // if an appropriate evolution already exists.
      evolution.creature = evolvedCreatureEntity;
      evolution.name = evolvedCreatureEntity.name;

      // Persist the new or existing evolution
      await evolutionEntityRepository.save(evolution);

      // Now, link the evolution to the base creature if it's not already linked
      baseCreatureEntity.evolutions.push(evolution);
      await creatureEntityRepository.save(baseCreatureEntity);
    }
  }
};
