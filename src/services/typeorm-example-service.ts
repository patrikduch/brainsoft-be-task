import { FastifyBaseLogger } from "fastify";

class TypeOrmExampleService {
  private readonly logger: FastifyBaseLogger;

  constructor({ logger }: { logger: FastifyBaseLogger }) {
    this.logger = logger;
  }

  public test() {
    console.log(this.logger.info("test patrik duch"));
  }
}

export default TypeOrmExampleService;
