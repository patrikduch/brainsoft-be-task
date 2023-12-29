import { OrmType } from "../../../../fastify";
import { CreatureEntity } from "../../../entities/creature-entity";
import { EvolutionEntity } from "../../../entities/evolution-entity";

export async function seedIvysaurToVenusaurPokemonEvolutoon(orm: OrmType) {
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
        evolutionId: venusaurEntity.id, // Assuming evolutionId represents the evolved form's ID
      },
    });

    if (!existingEvolution) {
      const evolution = new EvolutionEntity();
      evolution.creature = ivysaurEntity; // This should reference the pre-evolved form
      evolution.evolutionId = venusaurEntity.id; // This should be the ID, not a static number like 1
      evolution.name = "Ivysaur->Venusaur";

      await evolutionEntityRepository.save(evolution); // Make sure to await this save operation
    }
  }

  console.log("seedPokemonEvolutions");
  console.log(venusaurEntity);
  console.log(ivysaurEntity);
}
