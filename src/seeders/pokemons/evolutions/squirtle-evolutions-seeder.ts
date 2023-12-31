import { OrmType } from "../../../../fastify";
import { evolvePokemonHelper } from "../../../helpers/evolve-pokemon-helper";

export const seedSquirtlePokemonEvolutions = async (orm: OrmType) => {
  await evolvePokemonHelper(orm, "Squirtle", "Wartortle");
  await evolvePokemonHelper(orm, "Squirtle", "Blastoise");

  console.log("Finished seed of Squirtle evolutions");
};
