import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatureResistanceRelationship1703413389919 implements MigrationInterface {
    name = 'CreatureResistanceRelationship1703413389919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "creature_resistances_resistance_entity" ("creatureId" character varying NOT NULL, "resistanceEntityId" integer NOT NULL, CONSTRAINT "PK_9201892cce1e797c8fcb0a17b29" PRIMARY KEY ("creatureId", "resistanceEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_16d1a662896b5cc6cfe836d7a4" ON "creature_resistances_resistance_entity" ("creatureId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4a6919db3a5714203fc6843046" ON "creature_resistances_resistance_entity" ("resistanceEntityId") `);
        await queryRunner.query(`ALTER TABLE "creature_resistances_resistance_entity" ADD CONSTRAINT "FK_16d1a662896b5cc6cfe836d7a44" FOREIGN KEY ("creatureId") REFERENCES "creature"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "creature_resistances_resistance_entity" ADD CONSTRAINT "FK_4a6919db3a5714203fc68430469" FOREIGN KEY ("resistanceEntityId") REFERENCES "resistance_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "creature_resistances_resistance_entity" DROP CONSTRAINT "FK_4a6919db3a5714203fc68430469"`);
        await queryRunner.query(`ALTER TABLE "creature_resistances_resistance_entity" DROP CONSTRAINT "FK_16d1a662896b5cc6cfe836d7a44"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4a6919db3a5714203fc6843046"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_16d1a662896b5cc6cfe836d7a4"`);
        await queryRunner.query(`DROP TABLE "creature_resistances_resistance_entity"`);
    }

}
