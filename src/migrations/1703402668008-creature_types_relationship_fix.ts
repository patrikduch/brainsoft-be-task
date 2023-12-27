import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatureTypesRelationshipFix1703402668008 implements MigrationInterface {
    name = 'CreatureTypesRelationshipFix1703402668008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "creature_type" DROP CONSTRAINT "FK_1c20887f5f2b46cfa97bd67a246"`);
        await queryRunner.query(`CREATE TABLE "creature_types_creature_type" ("creatureId" character varying NOT NULL, "creatureTypeId" integer NOT NULL, CONSTRAINT "PK_9c4bba3c4a6c687c8375ef15928" PRIMARY KEY ("creatureId", "creatureTypeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_38c67eb8d03fb6a749e76e71a3" ON "creature_types_creature_type" ("creatureId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c925e118b1c146e34cec914c3e" ON "creature_types_creature_type" ("creatureTypeId") `);
        await queryRunner.query(`ALTER TABLE "creature_type" DROP COLUMN "creatureId"`);
        await queryRunner.query(`ALTER TABLE "creature_types_creature_type" ADD CONSTRAINT "FK_38c67eb8d03fb6a749e76e71a33" FOREIGN KEY ("creatureId") REFERENCES "creature"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "creature_types_creature_type" ADD CONSTRAINT "FK_c925e118b1c146e34cec914c3e8" FOREIGN KEY ("creatureTypeId") REFERENCES "creature_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "creature_types_creature_type" DROP CONSTRAINT "FK_c925e118b1c146e34cec914c3e8"`);
        await queryRunner.query(`ALTER TABLE "creature_types_creature_type" DROP CONSTRAINT "FK_38c67eb8d03fb6a749e76e71a33"`);
        await queryRunner.query(`ALTER TABLE "creature_type" ADD "creatureId" character varying`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c925e118b1c146e34cec914c3e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_38c67eb8d03fb6a749e76e71a3"`);
        await queryRunner.query(`DROP TABLE "creature_types_creature_type"`);
        await queryRunner.query(`ALTER TABLE "creature_type" ADD CONSTRAINT "FK_1c20887f5f2b46cfa97bd67a246" FOREIGN KEY ("creatureId") REFERENCES "creature"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
