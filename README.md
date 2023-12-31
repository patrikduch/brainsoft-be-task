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

Evolution -> Creature M:N

Each evolution can be associated with multiple creatures, therefore for instance Bulbasaur has evolution to Ivysaur and also Venusaur and Ivysaur has evolution to Venusaur, so Venusaur is used multiple times.

## Migrations

Create a new migration based on model change

```bash
yarn run migration:generate ./src/migrations/migration_name
```

## Project startup

### migrations

DB structure preparation

```bash
yarn run migrations:run
```

### app startup

```bash
yarn run dev
```

## GraphQL queries

API query example usage

### Queries resolvers

```bash
{
    searchByName(name:"Ivysaur"){id, name, evolutions{id, name}}
    getPokemonById(id: "002") {id, evolutions {name}}
}
```
