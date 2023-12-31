import { OrmType } from "../../../../fastify";
import { evolvePokemonHelper } from "../../../helpers/evolve-pokemon-helper";

export const seedCharmanderPokemonEvolutions = async (orm: OrmType) => {
  await evolvePokemonHelper(orm, "Charmander", "Charmeleon");
  await evolvePokemonHelper(orm, "Charmander", "Charizard");

  console.log("Finished seed of Charmander evolutions");
};
