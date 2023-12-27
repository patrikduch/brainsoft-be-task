import { MigrationInterface, QueryRunner } from "typeorm";

export class WeaknessEnttityJoinTable1703627391688
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."creature_weaknesses_weakness" RENAME TO "creature_weakness"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
