import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatureTypeRelationship1703401018979 implements MigrationInterface {
    name = 'CreatureTypeRelationship1703401018979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "creature_type" ADD "creatureId" character varying`);
        await queryRunner.query(`ALTER TABLE "creature_type" ADD CONSTRAINT "FK_1c20887f5f2b46cfa97bd67a246" FOREIGN KEY ("creatureId") REFERENCES "creature"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "creature_type" DROP CONSTRAINT "FK_1c20887f5f2b46cfa97bd67a246"`);
        await queryRunner.query(`ALTER TABLE "creature_type" DROP COLUMN "creatureId"`);
    }

}
