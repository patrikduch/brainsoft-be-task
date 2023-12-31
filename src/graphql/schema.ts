export const schema = `
type Query {
  pokemons(pageId: Int, pageSize: Int): PokemonPage
  favoritePokemons: [PokemonItem]
  getPokemonById(id: String!): PokemonItem
  searchPokemonByName(name: String!): PokemonItem
  getPokemonsByType(typeName: String!): [PokemonItem]
  getPokemonTypes: [PokemonType!]
}
type Mutation {
  setFavoritePokemon(pokemonId: String!): Boolean
  unsetFavoritePokemon(pokemonId: String!): Boolean
}

type PokemonPage {
  items: [PokemonItem]
  totalCount: Int
  pageId: Int
  pageSize: Int
}

type PokemonItem {
  id: String
  name: String
  classification: String
  types: [PokemonType!]
  resistances: [PokemonResistance!]
  weaknesses: [PokemonWeakness!]
  attacks: [PokemonAttack!]
  isFavorite: Boolean,
  evolutions: [PokemonEvolution]
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

type PokemonEvolution {
  id: String
  name: String
}

type Item {
  id: Int
  name: String
}
`;
