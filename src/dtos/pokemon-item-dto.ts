import { PokemonAttackDto } from "./pokemon-attack-dto";
import { PokemonResistanceDto } from "./pokemon-resistance-dto";
import { PokemonTypeDto } from "./pokemon-type-dto";
import { PokemonWeaknessDto } from "./pokemon-weakness-dto";

export class PokemonItemDto {
  public id: string | undefined;
  public name: string | undefined;
  public classification: string | undefined;
  public weightminimum: number | undefined;
  public types: PokemonTypeDto[] | undefined;
  public resistances: PokemonResistanceDto[] | undefined;
  public weaknesses: PokemonWeaknessDto[] | undefined;
  public attacks: PokemonAttackDto[] | undefined;
}
