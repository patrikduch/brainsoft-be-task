import { AttackEntity } from "../../entities/attack-entity";
import { CreatureEntity } from "../../entities/creature-entity";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { ResistanceEntity } from "../../entities/resistence-entity";
import { WeaknessEntity } from "../../entities/weakness-entity";
import { IGraphQLContext } from "../../typescript/interfaces/IGraphQLContext";

export async function seedVenusaurPokemon(context: IGraphQLContext) {
  const creatureEntityRepository =
    context.fastify.orm.getRepository(CreatureEntity);

  const creatureTypeEntityRepository =
    context.fastify.orm.getRepository(CreatureTypeEntity);

  const resistanceEntityRepository =
    context.fastify.orm.getRepository(ResistanceEntity);

  const weaknessEntityRepository =
    context.fastify.orm.getRepository(WeaknessEntity);

  const attackEntityRepository =
    context.fastify.orm.getRepository(AttackEntity);

  const venusaurEntity = await creatureEntityRepository.findOne({
    where: {
      id: "003",
    },
  });

  if (!venusaurEntity) {
    let venusaur = new CreatureEntity();
    venusaur.id = "003";
    venusaur.name = "Venusaur";
    venusaur.classification = "Seed Pokémon";
    venusaur.weight_minimum = 87.5; // Minimum weight in kilograms
    venusaur.weight_maximum = 112.5; // Maximum weight in kilograms
    venusaur.height_minimum = 1.75; // Minimum height in meters
    venusaur.height_maximum = 2.25; // Maximum height in meters
    venusaur.fleeRate = 0.05;
    venusaur.maxCP = 2392;
    venusaur.maxHP = 2580;

    await creatureEntityRepository.save(venusaur);
  }
}
