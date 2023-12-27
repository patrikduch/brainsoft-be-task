import { MigrationInterface, QueryRunner } from "typeorm";

export class AttackEntityNamingFix1703160883535 implements MigrationInterface {
  name = "AttackEntityNamingFix1703160883535";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                ALTER TABLE "attack"
                RENAME TO "attack_entity";`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                ALTER TABLE "attack_entity"
                RENAME TO "attack";`);
  }
}
