import { OrmType } from "../../../../fastify";
import { evolvePokemonHelper } from "../../../helpers/evolve-pokemon-helper";

export const seedBulbasaurPokemonEvolutions = async (orm: OrmType) => {
  await evolvePokemonHelper(orm, "Bulbasaur", "Ivysaur");
  await evolvePokemonHelper(orm, "Bulbasaur", "Venusaur");

  console.log("Finished seed of Bulbasaur evolutions");
};
