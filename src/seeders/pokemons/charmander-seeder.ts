import { AttackEntity } from "../../entities/attack-entity";
import { CreatureEntity } from "../../entities/creature-entity";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { ResistanceEntity } from "../../entities/resistence-entity";
import { WeaknessEntity } from "../../entities/weakness-entity";
import { IGraphQLContext } from "../../typescript/interfaces/IGraphQLContext";

export async function seedCharmanderPokemon(context: IGraphQLContext) {
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

  const charmanderEntity = await creatureEntityRepository.findOne({
    where: {
      id: "004",
    },
  });

  if (!charmanderEntity) {
    let charmander = new CreatureEntity();
    charmander.id = "004";
    charmander.name = "Charmander";
    charmander.classification = "Lizard Pokémon";
    charmander.weight_minimum = 7.44;
    charmander.weight_maximum = 9.56;
    charmander.height_minimum = 0.53;
    charmander.height_maximum = 0.68;
    charmander.fleeRate = 0.1;
    charmander.maxCP = 841;
    charmander.maxHP = 955;

    await creatureEntityRepository.save(charmander);
  }
}
