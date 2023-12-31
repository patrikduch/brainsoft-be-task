import { OrmType } from "../../../../fastify";
import { evolvePokemonHelper } from "../../../helpers/evolve-pokemon-helper";

export const seedCharmeleonPokemonEvolutions = async (orm: OrmType) => {
  evolvePokemonHelper(orm, "Charmeleon", "Charizard");

  console.log("Finished seed of Charmeleon evolutions");
};
