import type { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTasksTable1765487067224 implements MigrationInterface {
    name = "CreateTasksTable1765487067224";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "public"."tasks_priority_enum" AS ENUM('low', 'medium', 'high', 'urgent')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."tasks_status_enum" AS ENUM('todo', 'in_progress', 'review', 'done')`,
        );
        await queryRunner.query(
            `CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "due_date" TIMESTAMP NOT NULL, "priority" "public"."tasks_priority_enum" NOT NULL DEFAULT 'medium', "status" "public"."tasks_status_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TYPE "public"."tasks_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tasks_priority_enum"`);
    }
}
