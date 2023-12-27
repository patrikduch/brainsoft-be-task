import { MigrationInterface, QueryRunner } from "typeorm";

export class ResistanceWeaknessAssociation1703504824204 implements MigrationInterface {
    name = 'ResistanceWeaknessAssociation1703504824204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "creature_weaknesses_weakness-entity" ("creatureId" character varying NOT NULL, "weaknessEntityId" integer NOT NULL, CONSTRAINT "PK_3d24977e8ccd874d30ad4d4b686" PRIMARY KEY ("creatureId", "weaknessEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4d1cbb8e98d54b5aa21f8aa58f" ON "creature_weaknesses_weakness-entity" ("creatureId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e545d5fc27f90bdadd6d6737e1" ON "creature_weaknesses_weakness-entity" ("weaknessEntityId") `);
        await queryRunner.query(`ALTER TABLE "creature_weaknesses_weakness-entity" ADD CONSTRAINT "FK_4d1cbb8e98d54b5aa21f8aa58f8" FOREIGN KEY ("creatureId") REFERENCES "creature"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "creature_weaknesses_weakness-entity" ADD CONSTRAINT "FK_e545d5fc27f90bdadd6d6737e1e" FOREIGN KEY ("weaknessEntityId") REFERENCES "weakness-entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "creature_weaknesses_weakness-entity" DROP CONSTRAINT "FK_e545d5fc27f90bdadd6d6737e1e"`);
        await queryRunner.query(`ALTER TABLE "creature_weaknesses_weakness-entity" DROP CONSTRAINT "FK_4d1cbb8e98d54b5aa21f8aa58f8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e545d5fc27f90bdadd6d6737e1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4d1cbb8e98d54b5aa21f8aa58f"`);
        await queryRunner.query(`DROP TABLE "creature_weaknesses_weakness-entity"`);
    }

}
