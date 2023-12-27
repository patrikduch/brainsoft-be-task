export const schema = `
type Query {
  hello: String
  getPokemonById(id: String!): PokemonItem
  searchByName(name: String!): PokemonItem
  getPokemonTypes: [PokemonType!]
}
type Mutation {
  addItem(name: String!): Item
  setFavoritePokemon(pokemonId: String!): Boolean
}

type PokemonItem {
  id: String
  name: String
  classification: String
  types: [PokemonType!]
  resistances: [PokemonResistance!]
  weaknesses: [PokemonWeakness!]
  attacks: [PokemonAttack!]
}

type PokemonType {
  id: String
  name: String
}

type PokemonResistance {
  id: String
  name: String
}

type PokemonWeakness {
  id: String
  name: String
}

type PokemonAttack {
  id: String
  name: String
}

type Item {
  id: Int
  name: String
}
`;
