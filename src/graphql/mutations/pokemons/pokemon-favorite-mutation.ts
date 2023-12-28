import { CreatureEntity } from "../../../entities/creature-entity";
import { IGraphQLContext } from "../../../typescript/interfaces/IGraphQLContext";

export async function setFavoritePokemonMutation(
  pokemonId: string,
  context: IGraphQLContext
) {
  const creatureEntityRepository =
    context.fastify.orm.getRepository(CreatureEntity);

  try {
    const pokemon = await creatureEntityRepository.findOne({
      where: {
        id: pokemonId,
      },
    });
    if (!pokemon) {
      throw new Error("Pokemon not found");
    }

    pokemon.isFavorite = true;
    await creatureEntityRepository.save(pokemon);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function unsetFavoritePokemonMutation(
  pokemonId: string,
  context: IGraphQLContext
) {
  const creatureEntityRepository =
    context.fastify.orm.getRepository(CreatureEntity);

  try {
    const pokemon = await creatureEntityRepository.findOne({
      where: {
        id: pokemonId,
      },
    });
    if (!pokemon) {
      throw new Error("Pokemon not found");
    }

    pokemon.isFavorite = false;
    await creatureEntityRepository.save(pokemon);
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}
