import { OrmType } from "../../../../fastify";
import { evolvePokemonHelper } from "../../../helpers/evolve-pokemon-helper";

export const seedCaterpiePokemonEvolutions = async (orm: OrmType) => {
  await evolvePokemonHelper(orm, "Caterpie", "Metapod");
  await evolvePokemonHelper(orm, "Caterpie", "Butterfree");

  console.log("Finished seed of Caterpie evolutions");
};
