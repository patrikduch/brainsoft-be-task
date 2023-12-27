import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatureEvolutionRelatioship1703629789226 implements MigrationInterface {
    name = 'CreatureEvolutionRelatioship1703629789226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "evolution" ADD "creatureId" character varying`);
        await queryRunner.query(`ALTER TABLE "evolution" ADD CONSTRAINT "FK_11f7e08ac8435f2002926a8f76e" FOREIGN KEY ("creatureId") REFERENCES "creature"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "evolution" DROP CONSTRAINT "FK_11f7e08ac8435f2002926a8f76e"`);
        await queryRunner.query(`ALTER TABLE "evolution" DROP COLUMN "creatureId"`);
    }

}
