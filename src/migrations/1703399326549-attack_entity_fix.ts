import { MigrationInterface, QueryRunner } from "typeorm";

export class AttackEntityFix1703399326549 implements MigrationInterface {
    name = 'AttackEntityFix1703399326549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "attack_entity_id_seq" OWNED BY "attack_entity"."id"`);
        await queryRunner.query(`ALTER TABLE "attack_entity" ALTER COLUMN "id" SET DEFAULT nextval('"attack_entity_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "attack_entity" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TYPE "public"."attack_attacktype_enum" RENAME TO "attack_attacktype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."attack_entity_attacktype_enum" AS ENUM('Fast', 'Special')`);
        await queryRunner.query(`ALTER TABLE "attack_entity" ALTER COLUMN "attackType" TYPE "public"."attack_entity_attacktype_enum" USING "attackType"::"text"::"public"."attack_entity_attacktype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."attack_attacktype_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."attack_attacktype_enum_old" AS ENUM('Fast', 'Special')`);
        await queryRunner.query(`ALTER TABLE "attack_entity" ALTER COLUMN "attackType" TYPE "public"."attack_attacktype_enum_old" USING "attackType"::"text"::"public"."attack_attacktype_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."attack_entity_attacktype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."attack_attacktype_enum_old" RENAME TO "attack_attacktype_enum"`);
        await queryRunner.query(`ALTER TABLE "attack_entity" ALTER COLUMN "id" SET DEFAULT nextval('attack_id_seq')`);
        await queryRunner.query(`ALTER TABLE "attack_entity" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "attack_entity_id_seq"`);
    }

}
