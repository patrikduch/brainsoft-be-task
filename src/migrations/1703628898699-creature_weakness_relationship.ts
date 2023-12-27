import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatureWeaknessRelationship1703628898699 implements MigrationInterface {
    name = 'CreatureWeaknessRelationship1703628898699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "creature_types" ("creatureId" character varying NOT NULL, "weaknessId" integer NOT NULL, CONSTRAINT "PK_04d35b85bc4eaa9c337ecbd17d0" PRIMARY KEY ("creatureId", "weaknessId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bf2dc6126c4ba905efa406a651" ON "creature_types" ("creatureId") `);
        await queryRunner.query(`CREATE INDEX "IDX_68284c1118d6b09e93df2e2172" ON "creature_types" ("weaknessId") `);
        await queryRunner.query(`ALTER TABLE "creature_types" ADD CONSTRAINT "FK_bf2dc6126c4ba905efa406a6517" FOREIGN KEY ("creatureId") REFERENCES "creature"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "creature_types" ADD CONSTRAINT "FK_68284c1118d6b09e93df2e21721" FOREIGN KEY ("weaknessId") REFERENCES "weakness"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "creature_types" DROP CONSTRAINT "FK_68284c1118d6b09e93df2e21721"`);
        await queryRunner.query(`ALTER TABLE "creature_types" DROP CONSTRAINT "FK_bf2dc6126c4ba905efa406a6517"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_68284c1118d6b09e93df2e2172"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bf2dc6126c4ba905efa406a651"`);
        await queryRunner.query(`DROP TABLE "creature_types"`);
    }

}
