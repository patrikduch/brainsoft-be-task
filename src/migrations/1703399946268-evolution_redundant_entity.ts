import { MigrationInterface, QueryRunner } from "typeorm";

export class EvolutionRedundantEntity1703399946268
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "public"."entity"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
