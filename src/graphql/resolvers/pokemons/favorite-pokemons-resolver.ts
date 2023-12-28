import { PokemonItemDto } from "../../../dtos/pokemon-item-dto";
import { CreatureEntity } from "../../../entities/creature-entity";
import { mapToPokemonItemDto } from "../../../mappers/pokemon-item-dto-mapper";
import { IGraphQLContext } from "../../../typescript/interfaces/IGraphQLContext";

export async function favoritePokemonsResolver(
  context: IGraphQLContext
): Promise<PokemonItemDto[] | null> {
  const creatureEntityRepository =
    context.fastify.orm.getRepository(CreatureEntity);

  const favoriteCreatures = await creatureEntityRepository.find({
    where: { isFavorite: true },
    relations: ["types", "resistances", "weaknesses", "attacks", "evolutions"],
  });

  let pokemons: PokemonItemDto[] = [];

  favoriteCreatures.forEach((pokemonItem) => {
    const result = mapToPokemonItemDto(pokemonItem);
    pokemons.push(result);
  });

  return pokemons;
}
