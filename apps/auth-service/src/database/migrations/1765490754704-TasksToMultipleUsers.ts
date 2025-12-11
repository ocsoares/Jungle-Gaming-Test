import type { MigrationInterface, QueryRunner } from "typeorm";

export class TasksToMultipleUsers1765490754704 implements MigrationInterface {
    name = "TasksToMultipleUsers1765490754704";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "tasks_users" ("task_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_b060d9eb84751005d295be9ec13" PRIMARY KEY ("task_id", "user_id"))`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_d4e7f63e32fefcfe5d9b072d1d" ON "tasks_users" ("task_id") `,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_81380afceb956e4da0af28bcc2" ON "tasks_users" ("user_id") `,
        );
        await queryRunner.query(
            `ALTER TABLE "tasks_users" ADD CONSTRAINT "FK_d4e7f63e32fefcfe5d9b072d1d6" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "tasks_users" ADD CONSTRAINT "FK_81380afceb956e4da0af28bcc20" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "tasks_users" DROP CONSTRAINT "FK_81380afceb956e4da0af28bcc20"`,
        );
        await queryRunner.query(
            `ALTER TABLE "tasks_users" DROP CONSTRAINT "FK_d4e7f63e32fefcfe5d9b072d1d6"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_81380afceb956e4da0af28bcc2"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_d4e7f63e32fefcfe5d9b072d1d"`,
        );
        await queryRunner.query(`DROP TABLE "tasks_users"`);
    }
}
