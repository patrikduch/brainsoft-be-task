import { AttackEntity, AttackType } from "../entities/attack-entity";
import { CreatureEntity } from "../entities/creature-entity";
import { CreatureTypeEntity } from "../entities/creature-type-entity";
import { EvolutionEntity } from "../entities/evolution-entity";
import { ResistanceEntity } from "../entities/resistence-entity";
import { WeaknessEntity } from "../entities/weakness-entity";
import { mapToPokemonItemDto } from "./pokemon-item-dto-mapper";

const mockTypes: CreatureTypeEntity[] = [
  { id: 1, type: "Grass", creatures: [] },
  // ...additional mock types if needed
];

const mockResistances: ResistanceEntity[] = [
  { id: 1, name: "Water", creatures: [] },
];
const mockWeaknesses: WeaknessEntity[] = [
  { id: 1, name: "Fire", creatures: [] },
];
const mockAttacks: AttackEntity[] = [
  {
    id: 1,
    name: "Tackle",
    creatures: [],
    type: "",
    damage: 12,
    attackType: AttackType.Fast,
  },
];
const mockEvolutions: EvolutionEntity[] = [];

// Mock data for CreatureEntity
const mockCreatureEntity: CreatureEntity = {
  id: "001", // This should be a number
  name: "Bulbasaur",
  classification: "Seed Pokémon",
  weight_minimum: 6.9,
  weight_maximum: 7.8,
  height_minimum: 0.6,
  height_maximum: 0.8,
  fleeRate: 0.1,
  maxCP: 1115,
  maxHP: 128,
  isFavorite: true,
  types: mockTypes,
  resistances: mockResistances,
  weaknesses: mockWeaknesses,
  attacks: mockAttacks,
  evolutions: mockEvolutions,
};

describe("mapToPokemonItemDto", () => {
  it("correctly maps a CreatureEntity to a PokemonItemDto", () => {
    const dto = mapToPokemonItemDto(mockCreatureEntity);

    expect(dto.id).toEqual(mockCreatureEntity.id);
    expect(dto.name).toEqual(mockCreatureEntity.name);
    expect(dto.classification).toEqual(mockCreatureEntity.classification);

    expect(dto.types?.length).toEqual(mockCreatureEntity.types.length);
    expect(dto.resistances?.length).toEqual(
      mockCreatureEntity.resistances.length
    );
    expect(dto.weaknesses?.length).toEqual(
      mockCreatureEntity.weaknesses.length
    );
    expect(dto.attacks?.length).toEqual(mockCreatureEntity.attacks.length);
  });
});
