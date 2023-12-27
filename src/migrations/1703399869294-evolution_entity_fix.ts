import { MigrationInterface, QueryRunner } from "typeorm";

export class EvolutionEntityFix1703399869294 implements MigrationInterface {
  name = "EvolutionEntityFix1703399869294";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "evolution" ("id" SERIAL NOT NULL, "evolutionId" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_070b9b8cf0e424f2d5b18e4057a" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "evolution"`);
  }
}
