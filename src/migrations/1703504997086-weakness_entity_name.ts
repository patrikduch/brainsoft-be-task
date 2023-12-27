import { MigrationInterface, QueryRunner } from "typeorm";

export class WeaknessEntityName1703504997086 implements MigrationInterface {
    name = 'WeaknessEntityName1703504997086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "weakness" ("id" SERIAL NOT NULL, "weakness" character varying NOT NULL, CONSTRAINT "PK_b74bcbd950ee633364273ee55be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "creature_weaknesses_weakness" ("creatureId" character varying NOT NULL, "weaknessId" integer NOT NULL, CONSTRAINT "PK_4cb63c184af8b2f0031c571806a" PRIMARY KEY ("creatureId", "weaknessId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3f630db288462e5655dafac1ec" ON "creature_weaknesses_weakness" ("creatureId") `);
        await queryRunner.query(`CREATE INDEX "IDX_21b39a02db519539c73e75c620" ON "creature_weaknesses_weakness" ("weaknessId") `);
        await queryRunner.query(`ALTER TABLE "creature_weaknesses_weakness" ADD CONSTRAINT "FK_3f630db288462e5655dafac1ecd" FOREIGN KEY ("creatureId") REFERENCES "creature"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "creature_weaknesses_weakness" ADD CONSTRAINT "FK_21b39a02db519539c73e75c620d" FOREIGN KEY ("weaknessId") REFERENCES "weakness"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "creature_weaknesses_weakness" DROP CONSTRAINT "FK_21b39a02db519539c73e75c620d"`);
        await queryRunner.query(`ALTER TABLE "creature_weaknesses_weakness" DROP CONSTRAINT "FK_3f630db288462e5655dafac1ecd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_21b39a02db519539c73e75c620"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3f630db288462e5655dafac1ec"`);
        await queryRunner.query(`DROP TABLE "creature_weaknesses_weakness"`);
        await queryRunner.query(`DROP TABLE "weakness"`);
    }

}
