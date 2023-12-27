import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatureTypeEntity1703179394310 implements MigrationInterface {
  name = "CreatureTypeEntity1703179394310";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "creature-type" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_d0aa6d60d0fd43b06b6be7b2879" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "creature-type"`);
  }
}
