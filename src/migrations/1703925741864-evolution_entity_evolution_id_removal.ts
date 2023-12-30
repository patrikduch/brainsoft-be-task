import { MigrationInterface, QueryRunner } from "typeorm";

export class EvolutionEntityEvolutionIdRemoval1703925741864 implements MigrationInterface {
    name = 'EvolutionEntityEvolutionIdRemoval1703925741864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "evolution" DROP COLUMN "evolutionId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "evolution" ADD "evolutionId" character varying NOT NULL`);
    }

}
