import { MigrationInterface, QueryRunner } from "typeorm";

export class WeaknessEntityRedundancy1703505070344
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE "creature_weaknesses_weakness-entity";`
    );
    await queryRunner.query(`DROP TABLE "weakness-entity";`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
