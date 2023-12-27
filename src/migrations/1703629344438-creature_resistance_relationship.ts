import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatureResistanceRelationship1703629344438 implements MigrationInterface {
    name = 'CreatureResistanceRelationship1703629344438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "creature_resistance" ("creatureId" character varying NOT NULL, "resistanceId" integer NOT NULL, CONSTRAINT "PK_6c903b7886e9bbdb7aebad1a0b8" PRIMARY KEY ("creatureId", "resistanceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8a41a17eea668019c347fda3b9" ON "creature_resistance" ("creatureId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0a462f17188efec488c4924d30" ON "creature_resistance" ("resistanceId") `);
        await queryRunner.query(`ALTER TABLE "creature_resistance" ADD CONSTRAINT "FK_8a41a17eea668019c347fda3b94" FOREIGN KEY ("creatureId") REFERENCES "creature"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "creature_resistance" ADD CONSTRAINT "FK_0a462f17188efec488c4924d30b" FOREIGN KEY ("resistanceId") REFERENCES "resistance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "creature_resistance" DROP CONSTRAINT "FK_0a462f17188efec488c4924d30b"`);
        await queryRunner.query(`ALTER TABLE "creature_resistance" DROP CONSTRAINT "FK_8a41a17eea668019c347fda3b94"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0a462f17188efec488c4924d30"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8a41a17eea668019c347fda3b9"`);
        await queryRunner.query(`DROP TABLE "creature_resistance"`);
    }

}
