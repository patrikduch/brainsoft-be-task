import { OrmType } from "../../../../fastify";
import { evolvePokemonHelper } from "../../../helpers/evolve-pokemon-helper";

export const seedWartortlePokemonEvolutions = async (orm: OrmType) => {
  evolvePokemonHelper(orm, "Wartortle", "Blastoise");

  console.log("Finished seed of Wartortle evolutions");
};
