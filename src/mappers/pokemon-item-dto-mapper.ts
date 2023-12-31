import { PokemonAttackDto } from "../dtos/pokemon-attack-dto";
import { PokemonEvolutionDto } from "../dtos/pokemon-evolution-dto";
import { PokemonItemDto } from "../dtos/pokemon-item-dto";
import { PokemonResistanceDto } from "../dtos/pokemon-resistance-dto";
import { PokemonTypeDto } from "../dtos/pokemon-type-dto";
import { PokemonWeaknessDto } from "../dtos/pokemon-weakness-dto";
import { CreatureEntity } from "../entities/creature-entity";

export const mapToPokemonItemDto = (
  pokemonItem: CreatureEntity | null
): PokemonItemDto => {
  const result = new PokemonItemDto();
  result.id = pokemonItem?.id;
  result.name = pokemonItem?.name;
  result.classification = pokemonItem?.classification;
  result.weightminimum = pokemonItem?.weight_minimum;

  result.types = pokemonItem?.types?.map(
    (type) => new PokemonTypeDto(type.id, type.type)
  );

  result.resistances = pokemonItem?.resistances?.map(
    (resistance) => new PokemonResistanceDto(resistance.id, resistance.name)
  );

  result.weaknesses = pokemonItem?.weaknesses?.map(
    (weakness) => new PokemonWeaknessDto(weakness.id, weakness.name)
  );

  result.attacks = pokemonItem?.attacks?.map(
    (attack) => new PokemonAttackDto(attack.id, attack.name)
  );

  result.evolutions = pokemonItem?.evolutions?.map(
    (evolution) => new PokemonEvolutionDto(evolution.id, evolution.name)
  );

  result.isFavorite = pokemonItem?.isFavorite;

  return result;
};
