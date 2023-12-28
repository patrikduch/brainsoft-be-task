import { PokemonItemDto } from "../../../dtos/pokemon-item-dto";
import { CreatureEntity } from "../../../entities/creature-entity";
import { mapToPokemonItemDto } from "../../../mappers/pokemon-item-dto-mapper";
import { IGraphQLContext } from "../../../typescript/interfaces/IGraphQLContext";

export async function searchPokemonByNameResolver(
  name: string,
  context: IGraphQLContext
): Promise<PokemonItemDto | null> {
  const creatureEntityRepository =
    context.fastify.orm.getRepository(CreatureEntity);
  const pokemonItem = await creatureEntityRepository.findOne({
    relations: {
      attacks: true,
      types: true,
      resistances: true,
      weaknesses: true,
    },
    where: {
      name,
    },
  });

  return mapToPokemonItemDto(pokemonItem);
}
