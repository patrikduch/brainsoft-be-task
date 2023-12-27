import { MigrationInterface, QueryRunner } from "typeorm";

export class WeaknessEnttityNameFix1703625813477 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "public"."weakness"
        RENAME COLUMN weakness TO name;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
