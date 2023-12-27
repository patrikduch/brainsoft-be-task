import { MigrationInterface, QueryRunner } from "typeorm";

export class EntityRedundantRemoval1703399527332 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "public"."entity"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
