import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatureResistanceRelationshipFix1703629390466
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE "public"."creature_resistances_resistance";`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
