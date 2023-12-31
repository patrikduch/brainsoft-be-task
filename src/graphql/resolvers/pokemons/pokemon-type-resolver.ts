import { PokemonItemDto } from "../../../dtos/pokemon-item-dto";
import { CreatureEntity } from "../../../entities/creature-entity";
import { mapToPokemonItemDto } from "../../../mappers/pokemon-item-dto-mapper";
import { IGraphQLContext } from "../../../typescript/interfaces/IGraphQLContext";

export async function getPokemonsTypeResolver(
  context: IGraphQLContext,
  pokemonTypeName: string
): Promise<PokemonItemDto[] | null> {
  const creatureEntityRepository =
    context.fastify.orm.getRepository(CreatureEntity);

  const creatures = await creatureEntityRepository.find({
    relations: {
      types: true,
      attacks: true,
      resistances: true,
      weaknesses: true,
      evolutions: true,
    },
    where: {
      types: { type: pokemonTypeName },
    },
  });

  let pokemons: PokemonItemDto[] = [];
  creatures.forEach((pokemonItem) => {
    const result = mapToPokemonItemDto(pokemonItem);
    pokemons.push(result);
  });

  return pokemons;
}
