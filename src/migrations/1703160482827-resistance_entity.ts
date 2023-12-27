import { MigrationInterface, QueryRunner } from "typeorm";

export class ResistanceEntity1703160482827 implements MigrationInterface {
    name = 'ResistanceEntity1703160482827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "resistance_entity" ("id" SERIAL NOT NULL, "resistance" character varying NOT NULL, CONSTRAINT "PK_7a131c272fd006d22a282938ceb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "resistance_entity"`);
    }

}
