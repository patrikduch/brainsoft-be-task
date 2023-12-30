# brainsoft-be-task

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

## Domain

Evolution -> Creature M:N

Each evolution can be associated with multiple creatures, therefore for instance Bulbasaur has evolution to Ivysaur and also Venusaur and Ivysaur has evolution to Venusaur, so Venusaur is used multiple times.

## Project startup

### Migrations

DB preparation with test data

```bash
yarn run migrations:run
```

yarn run migration:generate ./src/migrations/evolution_relationship_fix

Query example usage

{
searchByName(name:"Ivysaur"){id, name, evolutions{id, name}}
getPokemonById(id: "002") {id, evolutions {name}}
}
