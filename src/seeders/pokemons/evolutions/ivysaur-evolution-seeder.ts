import { OrmType } from "../../../../fastify";
import { evolvePokemonHelper } from "../../../helpers/evolve-pokemon-helper";

export const seedIvysaurEvolutions = async (orm: OrmType) => {
  await evolvePokemonHelper(orm, "Ivysaur", "Venusaur");

  console.log("Finished seed of Ivysaur evolutions");
};
