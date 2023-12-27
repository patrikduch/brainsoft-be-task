import { MigrationInterface, QueryRunner } from "typeorm";

export class WeaknessEntity1703179726951 implements MigrationInterface {
  name = "WeaknessEntity1703179726951";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "weakness-entity" ("id" SERIAL NOT NULL, "weakness" character varying NOT NULL, CONSTRAINT "PK_3e02ed0e5d28c6f3af4c7bdc2cf" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "weakness-entity"`);
  }
}
