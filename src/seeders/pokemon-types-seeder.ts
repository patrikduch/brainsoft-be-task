import { CreatureTypeEntity } from "../entities/creature-type-entity";
import { IGraphQLContext } from "../typescript/interfaces/IGraphQLContext";

// Predefined types
const types = [
  "Grass",
  "Poison",
  "Fire",
  "Water",
  "Bug",
  "Normal",
  "Electric",
  "Ground",
  "Fairy",
  "Fighting",
];

export async function seedCreatureTypes(context: IGraphQLContext) {
  const repository = context.fastify.orm.getRepository(CreatureTypeEntity);

  for (const typeName of types) {
    let type = new CreatureTypeEntity();
    type.type = typeName;

    // Save each type to the database
    await repository.save(type);
  }

  console.log("Creature types have been seeded.");
}
