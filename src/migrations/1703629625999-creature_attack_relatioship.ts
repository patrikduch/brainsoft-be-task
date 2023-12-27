import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatureAttackRelatioship1703629625999 implements MigrationInterface {
    name = 'CreatureAttackRelatioship1703629625999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "creature_attacks" ("creatureId" character varying NOT NULL, "attackId" integer NOT NULL, CONSTRAINT "PK_494b18f3a5c4c25a792daf530da" PRIMARY KEY ("creatureId", "attackId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6aa219a3d6c1d0d617ccafb62a" ON "creature_attacks" ("creatureId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9433403b1333458f7ae80d8d30" ON "creature_attacks" ("attackId") `);
        await queryRunner.query(`ALTER TABLE "creature_attacks" ADD CONSTRAINT "FK_6aa219a3d6c1d0d617ccafb62a9" FOREIGN KEY ("creatureId") REFERENCES "creature"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "creature_attacks" ADD CONSTRAINT "FK_9433403b1333458f7ae80d8d30c" FOREIGN KEY ("attackId") REFERENCES "attack"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "creature_attacks" DROP CONSTRAINT "FK_9433403b1333458f7ae80d8d30c"`);
        await queryRunner.query(`ALTER TABLE "creature_attacks" DROP CONSTRAINT "FK_6aa219a3d6c1d0d617ccafb62a9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9433403b1333458f7ae80d8d30"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6aa219a3d6c1d0d617ccafb62a"`);
        await queryRunner.query(`DROP TABLE "creature_attacks"`);
    }

}
