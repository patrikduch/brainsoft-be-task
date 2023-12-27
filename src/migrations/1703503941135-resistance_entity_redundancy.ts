import { MigrationInterface, QueryRunner } from "typeorm";

export class ResistanceEntityRedundancy1703503941135
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE "creature_resistances_resistance_entity";`
    );
    await queryRunner.query(`DROP TABLE "resistance_entity";`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
