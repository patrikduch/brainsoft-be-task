import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatureFavoriteAttribute1703630059352 implements MigrationInterface {
    name = 'CreatureFavoriteAttribute1703630059352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "creature" ADD "isFavorite" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "creature" DROP COLUMN "isFavorite"`);
    }

}
