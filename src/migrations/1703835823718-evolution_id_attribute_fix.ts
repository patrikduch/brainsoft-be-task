import { MigrationInterface, QueryRunner } from "typeorm";

export class EvolutionIdAttributeFix1703835823718
  implements MigrationInterface
{
  name = "EvolutionIdAttributeFix1703835823718";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "evolution" ALTER COLUMN "evolutionId" TYPE character varying;
      `
    );
    await queryRunner.query(
      `ALTER TABLE "evolution" ALTER COLUMN "evolutionId" SET NOT NULL;`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
