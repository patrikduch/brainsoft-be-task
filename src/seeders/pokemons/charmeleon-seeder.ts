import { AttackEntity } from "../../entities/attack-entity";
import { CreatureEntity } from "../../entities/creature-entity";
import { CreatureTypeEntity } from "../../entities/creature-type-entity";
import { ResistanceEntity } from "../../entities/resistence-entity";
import { WeaknessEntity } from "../../entities/weakness-entity";
import { IGraphQLContext } from "../../typescript/interfaces/IGraphQLContext";

const charmeleonData = {
  id: "005",
  name: "Charmeleon",
  classification: "Flame Pokémon",
  types: ["Fire"],
  resistant: ["Fire", "Grass", "Ice", "Bug", "Steel", "Fairy"],
  weaknesses: ["Water", "Ground", "Rock"],
  weight: { minimum: "16.63kg", maximum: "21.38kg" },
  height: { minimum: "0.96m", maximum: "1.24m" },
  fleeRate: 0.07,
  previousEvolutions: [{ id: 4, name: "Charmander" }],
  evolutionRequirements: { amount: 100, name: "Charmander candies" },
  evolutions: [{ id: 6, name: "Charizard" }],
  maxCP: 1411,
  maxHP: 1557,
  attacks: {
    fast: [
      { name: "Ember", type: "Fire", damage: 10 },
      { name: "Scratch", type: "Normal", damage: 6 },
    ],
    special: [
      { name: "Fire Punch", type: "Fire", damage: 40 },
      { name: "Flame Burst", type: "Fire", damage: 30 },
      { name: "Flamethrower", type: "Fire", damage: 55 },
    ],
  },
};

export async function seedCharmeleonPokemon(context: IGraphQLContext) {
  const creatureEntityRepository =
    context.fastify.orm.getRepository(CreatureEntity);

  const creatureTypeEntityRepository =
    context.fastify.orm.getRepository(CreatureTypeEntity);

  const resistanceEntityRepository =
    context.fastify.orm.getRepository(ResistanceEntity);

  const weaknessEntityRepository =
    context.fastify.orm.getRepository(WeaknessEntity);

  const attackEntityRepository =
    context.fastify.orm.getRepository(AttackEntity);

  const charmeleonEntity = await creatureEntityRepository.findOne({
    where: { id: charmeleonData.id },
  });

  if (!charmeleonEntity) {
    let charmeleon = new CreatureEntity();
    charmeleon.id = charmeleonData.id;
    charmeleon.name = charmeleonData.name;
    charmeleon.classification = charmeleonData.classification;
    charmeleon.weight_minimum = 16.63;
    charmeleon.weight_maximum = 21.38;
    charmeleon.height_minimum = 0.96;
    charmeleon.height_maximum = 1.24;
    charmeleon.fleeRate = charmeleonData.fleeRate;
    charmeleon.maxCP = charmeleonData.maxCP;
    charmeleon.maxHP = charmeleonData.maxHP;

    await creatureEntityRepository.save(charmeleon);
  }
}
