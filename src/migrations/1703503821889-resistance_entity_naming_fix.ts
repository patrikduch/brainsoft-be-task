import { MigrationInterface, QueryRunner } from "typeorm";

export class ResistanceEntityNamingFix1703503821889 implements MigrationInterface {
    name = 'ResistanceEntityNamingFix1703503821889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "resistance" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8b91aa1a4b047294b638b3c9f3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "creature_resistances_resistance" ("creatureId" character varying NOT NULL, "resistanceId" integer NOT NULL, CONSTRAINT "PK_2243fb07e68a17990f02afbf582" PRIMARY KEY ("creatureId", "resistanceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e9f9c6a54fb8d7851d6f3b49d3" ON "creature_resistances_resistance" ("creatureId") `);
        await queryRunner.query(`CREATE INDEX "IDX_58be2d11e0b0d54511c8fdd4eb" ON "creature_resistances_resistance" ("resistanceId") `);
        await queryRunner.query(`ALTER TABLE "creature_resistances_resistance" ADD CONSTRAINT "FK_e9f9c6a54fb8d7851d6f3b49d3a" FOREIGN KEY ("creatureId") REFERENCES "creature"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "creature_resistances_resistance" ADD CONSTRAINT "FK_58be2d11e0b0d54511c8fdd4eb9" FOREIGN KEY ("resistanceId") REFERENCES "resistance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "creature_resistances_resistance" DROP CONSTRAINT "FK_58be2d11e0b0d54511c8fdd4eb9"`);
        await queryRunner.query(`ALTER TABLE "creature_resistances_resistance" DROP CONSTRAINT "FK_e9f9c6a54fb8d7851d6f3b49d3a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_58be2d11e0b0d54511c8fdd4eb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e9f9c6a54fb8d7851d6f3b49d3"`);
        await queryRunner.query(`DROP TABLE "creature_resistances_resistance"`);
        await queryRunner.query(`DROP TABLE "resistance"`);
    }

}
