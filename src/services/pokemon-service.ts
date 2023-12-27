import { FastifyBaseLogger } from "fastify";
import { OrmType } from "../../fastify";
import { CreatureEntity } from "../entities/creature-entity";

class PokemonService {
  private readonly logger: FastifyBaseLogger;
  private readonly orm: OrmType;

  constructor({ logger, orm }: { logger: FastifyBaseLogger; orm: OrmType }) {
    this.logger = logger;
    console.log(orm);
    this.orm = orm;
  }

  async test(id: string) {
    console.log("test func");
    console.log(this.orm);

    //const creatureEntityRepository = this.orm.getRepository(CreatureEntity);
    //const pokemonItem = await creatureEntityRepository.findOneBy({ id });
    //return pokemonItem;
  }
}

export default PokemonService;
