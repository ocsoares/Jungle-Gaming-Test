import type { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTaskHistoryTable1765594875296 implements MigrationInterface {
    name = "CreateTaskHistoryTable1765594875296";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "task_histories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "taskId" character varying NOT NULL, "action" character varying NOT NULL, "changes" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bd96cd730a4a6bb227688793d97" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task_histories"`);
    }
}
