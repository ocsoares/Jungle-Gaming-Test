import type { MigrationInterface, QueryRunner } from "typeorm";

export class ImproveTaskHistoryTable1765595545620 implements MigrationInterface {
    name = "ImproveTaskHistoryTable1765595545620";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "task_histories" DROP COLUMN "action"`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."task_histories_action_enum" AS ENUM('CREATED', 'UPDATED', 'DELETED')`,
        );
        await queryRunner.query(
            `ALTER TABLE "task_histories" ADD "action" "public"."task_histories_action_enum" NOT NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "task_histories" DROP COLUMN "action"`,
        );
        await queryRunner.query(
            `DROP TYPE "public"."task_histories_action_enum"`,
        );
        await queryRunner.query(
            `ALTER TABLE "task_histories" ADD "action" character varying NOT NULL`,
        );
    }
}
