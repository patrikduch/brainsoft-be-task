import { OrmType } from "../../../../fastify";
import { evolvePokemonHelper } from "../../../helpers/evolve-pokemon-helper";

export const seedMetapodPokemonEvolutions = async (orm: OrmType) => {
  await evolvePokemonHelper(orm, "Metapod", "Butterfree");

  console.log("Finished seed of Metapod evolutions");
};
