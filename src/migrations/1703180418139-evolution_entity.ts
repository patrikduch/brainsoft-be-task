import { MigrationInterface, QueryRunner } from "typeorm";

export class EvolutionEntity1703180418139 implements MigrationInterface {
    name = 'EvolutionEntity1703180418139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."attack-entity_attacktype_enum" AS ENUM('Fast', 'Special')`);
        await queryRunner.query(`CREATE TABLE "attack-entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "damage" integer NOT NULL, "attackType" "public"."attack-entity_attacktype_enum" NOT NULL, CONSTRAINT "PK_e88844ff9458a4ac41b478e7a0a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "entity" ("id" SERIAL NOT NULL, "evolutionId" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_50a7741b415bc585fcf9c984332" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "entity"`);
        await queryRunner.query(`DROP TABLE "attack-entity"`);
        await queryRunner.query(`DROP TYPE "public"."attack-entity_attacktype_enum"`);
    }

}
