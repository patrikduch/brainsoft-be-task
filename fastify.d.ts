import { ObjectLiteral, Repository } from "typeorm";

export type OrmType = {
  getRepository<Entity extends ObjectLiteral>(
    entity: new () => Entity
  ): Repository<Entity>;
};

declare module "fastify" {
  interface FastifyInstance {
    orm: OrmType;
    pokemonService: PokemonService;
  }
}
