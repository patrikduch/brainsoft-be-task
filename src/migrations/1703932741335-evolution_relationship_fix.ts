import { MigrationInterface, QueryRunner } from "typeorm";

export class EvolutionRelationshipFix1703932741335 implements MigrationInterface {
    name = 'EvolutionRelationshipFix1703932741335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "evolution" DROP CONSTRAINT "FK_11f7e08ac8435f2002926a8f76e"`);
        await queryRunner.query(`CREATE TABLE "creature_evolution" ("creatureId" character varying NOT NULL, "evolutionId" integer NOT NULL, CONSTRAINT "PK_6f66ecd0c1c8f9f7b95985a772c" PRIMARY KEY ("creatureId", "evolutionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7bd62eb4faa1d7781638a29951" ON "creature_evolution" ("creatureId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dc15669baf1e773347bbccb84b" ON "creature_evolution" ("evolutionId") `);
        await queryRunner.query(`ALTER TABLE "evolution" DROP COLUMN "creatureId"`);
        await queryRunner.query(`ALTER TABLE "creature_evolution" ADD CONSTRAINT "FK_7bd62eb4faa1d7781638a29951e" FOREIGN KEY ("creatureId") REFERENCES "creature"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "creature_evolution" ADD CONSTRAINT "FK_dc15669baf1e773347bbccb84bd" FOREIGN KEY ("evolutionId") REFERENCES "evolution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "creature_evolution" DROP CONSTRAINT "FK_dc15669baf1e773347bbccb84bd"`);
        await queryRunner.query(`ALTER TABLE "creature_evolution" DROP CONSTRAINT "FK_7bd62eb4faa1d7781638a29951e"`);
        await queryRunner.query(`ALTER TABLE "evolution" ADD "creatureId" character varying`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dc15669baf1e773347bbccb84b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7bd62eb4faa1d7781638a29951"`);
        await queryRunner.query(`DROP TABLE "creature_evolution"`);
        await queryRunner.query(`ALTER TABLE "evolution" ADD CONSTRAINT "FK_11f7e08ac8435f2002926a8f76e" FOREIGN KEY ("creatureId") REFERENCES "creature"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
