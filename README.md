# brainsoft-be-task

Based on skeleton project from Patrik Duch
https://github.com/patrikduch/fastify-be-template

## Task description

Design the database to store information for the Pokemon data
Load the database with the data
Implement the API Interface with the following features:

<u>Query pokemons with the options:</u>

- Pagination
- Search by name
- Filter by pokemon type
- Filter by favorite

- Query a pokemon by id
- Query a pokemon by name
- Query list of pokemon types
- Mutation to mark/unmark pokemon as favorite

<p>Test are important and if time allows it, we'd like to see some test coverage.</p>

<strong><i>Extended with pokemon evolution functionality. Each pokemon may or may not have the evolutions phases (concept of levelling up, if the pokemon cannot evolve anymore - no evolutions are present.)</i></strong>

## Domain

<img src="https://github.com/patrikduch/brainsoft-be-task/blob/main/documentation/images/diagram.png?raw=true" />

creature_type -> creature (M:N)

Each type of pokemon can be associated with multiple pokemons and each pokemon can be identified by more types.

resistance -> creature (M:N)

Each resistance can be assoaciated with multiple pokemons and each pokemon can have more resistance attributes.

weakness -> creature (M:N)

Each weakness can be assoaciated with multiple pokemons and each pokemon can have more weakness attributes.

attack -> creature (M:N)

Each attack can be assoaciated with multiple pokemons and each pokemon can have more attack attributes.

evolution -> creature (M:N)

Each evolution can be associated with multiple creatures, therefore for instance Bulbasaur has evolution to Ivysaur and also Venusaur and Ivysaur has evolution to Venusaur, so Venusaur is used multiple times.

## Migrations

Create a new migration based on model change

```bash
yarn run migration:generate ./src/migrations/migration_name
```

## Project startup

### Migrations

DB structure preparation

```bash
yarn run migrations:run
```

### App startup

Run the build. This command will watch the codebase for upcoming changes.

```bash
yarn run build
```

Startup of Fastify server

```bash
yarn run dev
```

## GraphQL queries

API query example usage

### Queries resolvers

```bash
{
  pokemons(pageId: 3, pageSize: 5){items{name}}
  searchPokemonByName(name:"Ivysaur"){id, name, isFavorite, evolutions{id, name}}
  getPokemonById(id: "007") {id, name, isFavorite, evolutions {id, name}}
  favoritePokemons {id, name},
  getPokemonTypes {id, name}
  getPokemonsByType(typeName:"Grass"){id, name, resistances {name}}
}
```

### Mutations

Set pokemon as a favorite

```bash
mutation {setFavoritePokemon(pokemonId:"002")}
```

Unset a pokemon as a favorite

```bash
mutation{unsetFavoritePokemon(pokemonId: "002")}
```
