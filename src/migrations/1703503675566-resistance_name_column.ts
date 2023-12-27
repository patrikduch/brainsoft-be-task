import { MigrationInterface, QueryRunner } from "typeorm";

export class ResistanceNameColumn1703503675566 implements MigrationInterface {
    name = 'ResistanceNameColumn1703503675566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resistance_entity" RENAME COLUMN "resistance" TO "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resistance_entity" RENAME COLUMN "name" TO "resistance"`);
    }

}
