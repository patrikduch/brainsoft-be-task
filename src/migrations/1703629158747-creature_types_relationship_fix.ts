import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatureTypesRelationshipFix1703629158747
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE "public"."creature_types_creature_type";`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
