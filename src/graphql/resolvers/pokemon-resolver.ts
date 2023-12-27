import { PokemonAttackDto } from "../../dtos/pokemon-attack-dto";
import { PokemonItemDto } from "../../dtos/pokemon-item-dto";
import { PokemonResistanceDto } from "../../dtos/pokemon-resistance-dto";
import { PokemonTypeDto } from "../../dtos/pokemon-type-dto";
import { PokemonWeaknessDto } from "../../dtos/pokemon-weakness-dto";
import { CreatureEntity } from "../../entities/creature-entity";
import { IGraphQLContext } from "../../typescript/interfaces/IGraphQLContext";

export async function getPokemonItemByIdResolver(
  id: string,
  context: IGraphQLContext
): Promise<PokemonItemDto | null> {
  const creatureEntityRepository =
    context.fastify.orm.getRepository(CreatureEntity);
  const pokemonItem = await creatureEntityRepository.findOne({
    relations: {
      attacks: true,
      types: true,
      resistances: true,
      weaknesses: true,
    },
    where: {
      id,
    },
  });

  context.fastify.log.info("PokemonItem");

  context.fastify.log.info(pokemonItem);

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

  context.fastify.log.info(result);

  return result;
}

export async function searchPokemonByNameResolver(
  name: string,
  context: IGraphQLContext
): Promise<PokemonItemDto | null> {
  const creatureEntityRepository =
    context.fastify.orm.getRepository(CreatureEntity);
  const pokemonItem = await creatureEntityRepository.findOne({
    relations: {
      attacks: true,
      types: true,
      resistances: true,
      weaknesses: true,
    },
    where: {
      name,
    },
  });

  const result = new PokemonItemDto();
  result.id = pokemonItem?.id;
  result.name = pokemonItem?.name;

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

  return result;
}
