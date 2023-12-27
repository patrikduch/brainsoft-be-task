import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatureTypesRelationship1703629005239 implements MigrationInterface {
    name = 'CreatureTypesRelationship1703629005239'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "creature_types" DROP CONSTRAINT "FK_68284c1118d6b09e93df2e21721"`);
        await queryRunner.query(`ALTER TABLE "creature_weakness" DROP CONSTRAINT "FK_3f630db288462e5655dafac1ecd"`);
        await queryRunner.query(`ALTER TABLE "creature_weakness" DROP CONSTRAINT "FK_21b39a02db519539c73e75c620d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_68284c1118d6b09e93df2e2172"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3f630db288462e5655dafac1ec"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_21b39a02db519539c73e75c620"`);
        await queryRunner.query(`ALTER TABLE "creature_types" RENAME COLUMN "weaknessId" TO "creatureTypeId"`);
        await queryRunner.query(`ALTER TABLE "creature_types" RENAME CONSTRAINT "PK_04d35b85bc4eaa9c337ecbd17d0" TO "PK_0c56b93526f79709bc8ba834297"`);
        await queryRunner.query(`CREATE INDEX "IDX_fa480eb40648bab8c8d4832d11" ON "creature_types" ("creatureTypeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9f122c8830ebaed66b958306fa" ON "creature_weakness" ("creatureId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6317c55a3f9f18803c39db4885" ON "creature_weakness" ("weaknessId") `);
        await queryRunner.query(`ALTER TABLE "creature_types" ADD CONSTRAINT "FK_fa480eb40648bab8c8d4832d112" FOREIGN KEY ("creatureTypeId") REFERENCES "creature_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "creature_weakness" ADD CONSTRAINT "FK_9f122c8830ebaed66b958306fa0" FOREIGN KEY ("creatureId") REFERENCES "creature"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "creature_weakness" ADD CONSTRAINT "FK_6317c55a3f9f18803c39db48857" FOREIGN KEY ("weaknessId") REFERENCES "weakness"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "creature_weakness" DROP CONSTRAINT "FK_6317c55a3f9f18803c39db48857"`);
        await queryRunner.query(`ALTER TABLE "creature_weakness" DROP CONSTRAINT "FK_9f122c8830ebaed66b958306fa0"`);
        await queryRunner.query(`ALTER TABLE "creature_types" DROP CONSTRAINT "FK_fa480eb40648bab8c8d4832d112"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6317c55a3f9f18803c39db4885"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9f122c8830ebaed66b958306fa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fa480eb40648bab8c8d4832d11"`);
        await queryRunner.query(`ALTER TABLE "creature_types" RENAME CONSTRAINT "PK_0c56b93526f79709bc8ba834297" TO "PK_04d35b85bc4eaa9c337ecbd17d0"`);
        await queryRunner.query(`ALTER TABLE "creature_types" RENAME COLUMN "creatureTypeId" TO "weaknessId"`);
        await queryRunner.query(`CREATE INDEX "IDX_21b39a02db519539c73e75c620" ON "creature_weakness" ("weaknessId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3f630db288462e5655dafac1ec" ON "creature_weakness" ("creatureId") `);
        await queryRunner.query(`CREATE INDEX "IDX_68284c1118d6b09e93df2e2172" ON "creature_types" ("weaknessId") `);
        await queryRunner.query(`ALTER TABLE "creature_weakness" ADD CONSTRAINT "FK_21b39a02db519539c73e75c620d" FOREIGN KEY ("weaknessId") REFERENCES "weakness"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "creature_weakness" ADD CONSTRAINT "FK_3f630db288462e5655dafac1ecd" FOREIGN KEY ("creatureId") REFERENCES "creature"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "creature_types" ADD CONSTRAINT "FK_68284c1118d6b09e93df2e21721" FOREIGN KEY ("weaknessId") REFERENCES "weakness"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
