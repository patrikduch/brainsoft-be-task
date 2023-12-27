import { MigrationInterface, QueryRunner } from "typeorm";

export class AttackEntityNamingFix1703505357269 implements MigrationInterface {
  name = "AttackEntityNamingFix1703505357269";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "public"."attack_entity"`);

    await queryRunner.query(
      `CREATE TYPE "public"."attack_attacktype_enum" AS ENUM('Fast', 'Special')`
    );
    await queryRunner.query(
      `CREATE TABLE "attack" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "damage" integer NOT NULL, "attackType" "public"."attack_attacktype_enum" NOT NULL, CONSTRAINT "PK_b63e4c74e7b45ef2d42a82bdabc" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "attack"`);
    await queryRunner.query(`DROP TYPE "public"."attack_attacktype_enum"`);
  }
}
