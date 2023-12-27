import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatureEntity1703180538068 implements MigrationInterface {
    name = 'CreatureEntity1703180538068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "creature" ("id" character varying NOT NULL, "name" character varying NOT NULL, "classification" character varying NOT NULL, "weight_minimum" double precision NOT NULL, "weight_maximum" double precision NOT NULL, "height_minimum" double precision NOT NULL, "height_maximum" double precision NOT NULL, "fleeRate" double precision NOT NULL, "maxCP" integer NOT NULL, "maxHP" integer NOT NULL, CONSTRAINT "PK_d464e47c18ab183549205496127" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "creature"`);
    }

}
