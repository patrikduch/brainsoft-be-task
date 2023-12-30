import { OrmType } from "../../../../fastify";
import { CreatureEntity } from "../../../entities/creature-entity";
import { EvolutionEntity } from "../../../entities/evolution-entity";

export async function seedIvysaurPokemonEvolutoon(orm: OrmType) {
  const creatureEntityRepository = orm.getRepository(CreatureEntity);
  const evolutionEntityRepository = orm.getRepository(EvolutionEntity);

  // Ivysaur -> Venusaur
  const venusaurEntity = (await creatureEntityRepository.findOne({
    where: {
      name: "Venusaur",
    },
  })) as CreatureEntity;

  const ivysaurEntity = (await creatureEntityRepository.findOne({
    where: {
      name: "Ivysaur",
    },
  })) as CreatureEntity;

  if (venusaurEntity && ivysaurEntity) {
    // Check if the evolution already exists to avoid duplicates
    const existingEvolution = await evolutionEntityRepository.findOne({
      where: {
        creature: ivysaurEntity,
        id: venusaurEntity.id, 
      },
    });

    if (!existingEvolution) {
      const evolution = new EvolutionEntity();
      evolution.creature = ivysaurEntity; 
      evolution.name = venusaurEntity.name;

      await evolutionEntityRepository.save(evolution); 
    }
  }

  console.log("Finished seed of Ivysaur evolutions");
}
