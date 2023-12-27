import { FastifyInstance } from "fastify";
import { MercuriusContext } from "mercurius";

export interface IGraphQLContext extends MercuriusContext {
  fastify: FastifyInstance;
}
