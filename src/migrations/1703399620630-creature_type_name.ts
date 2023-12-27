import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatureTypeName1703399620630 implements MigrationInterface {
    name = 'CreatureTypeName1703399620630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "creature_type" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_672d99e4f954575c2c26fc091fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "entity" ("id" SERIAL NOT NULL, "evolutionId" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_50a7741b415bc585fcf9c984332" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "attack_entity_id_seq" OWNED BY "attack_entity"."id"`);
        await queryRunner.query(`ALTER TABLE "attack_entity" ALTER COLUMN "id" SET DEFAULT nextval('"attack_entity_id_seq"')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attack_entity" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "attack_entity_id_seq"`);
        await queryRunner.query(`DROP TABLE "entity"`);
        await queryRunner.query(`DROP TABLE "creature_type"`);
    }

}
