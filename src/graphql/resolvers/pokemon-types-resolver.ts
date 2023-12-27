import { PokemonTypeDto } from "../../dtos/pokemon-type-dto";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { IGraphQLContext } from "../../typescript/interfaces/IGraphQLContext";

export async function getPokemonTypesResolver(
  context: IGraphQLContext
): Promise<PokemonTypeDto[] | null> {
  const creatureTypesEntityRepository =
    context.fastify.orm.getRepository(CreatureTypeEntity);

  const pokemonTypes = await creatureTypesEntityRepository.find();

  const resultArray = pokemonTypes.map(
    (pokemomType) => new PokemonTypeDto(pokemomType.id, pokemomType.type)
  );

  return resultArray;
}
