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

  const creatures = await creatureEntityRepository
    .createQueryBuilder("creature")
    .leftJoinAndSelect("creature.types", "type")
    .where("type.type = :pokemonTypeName", { pokemonTypeName })
    .getMany();

  let pokemons: PokemonItemDto[] = [];
  creatures.forEach((pokemonItem) => {
    const result = mapToPokemonItemDto(pokemonItem);
    pokemons.push(result);
  });

  return pokemons;
}
