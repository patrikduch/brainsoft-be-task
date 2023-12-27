import { MigrationInterface, QueryRunner } from "typeorm";

export class AttackEntityRedundantRemoval1703399437844
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "public"."attack-entity"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
