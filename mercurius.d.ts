import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import "mercurius";

declare module "mercurius" {
  interface MercuriusContext {
    // Add the fastify property to the MercuriusContext interface
    fastify: FastifyInstance;
  }
}
