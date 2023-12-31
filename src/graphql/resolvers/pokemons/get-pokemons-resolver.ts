import { CreatureEntity } from "../../../entities/creature-entity";
import { IGraphQLContext } from "../../../typescript/interfaces/IGraphQLContext";

export async function getPokemonsResolver(
  pageId: number,
  pageSize: number,
  context: IGraphQLContext
) {
  const creatureEntityRepository =
    context.fastify.orm.getRepository(CreatureEntity);

  const offset = (pageId - 1) * pageSize;

  console.log("pageId");
  console.log(pageId);

  console.log("pageSize");
  console.log(pageSize);

  console.log(offset);
  const limit = pageSize;

  const pokemons = await creatureEntityRepository.find({
    skip: offset,
    take: limit,
    order: {
      id: "ASC",
    },
  });

  const totalCount = await creatureEntityRepository.count();

  return {
    items: pokemons,
    totalCount,
    pageId,
    pageSize,
  };
}
