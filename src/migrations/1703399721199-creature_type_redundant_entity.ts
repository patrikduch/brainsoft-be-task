import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatureTypeRedundantEntity1703399721199
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "public"."creature-type"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
