import type { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNotificationsTable1765851827715 implements MigrationInterface {
    name = "CreateNotificationsTable1765851827715";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "public"."notification_event_enum" AS ENUM('TASK_CREATED', 'TASK_UPDATED', 'COMMENT_NEW')`,
        );

        await queryRunner.query(
            `CREATE TABLE "notifications" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "userId" uuid NOT NULL,
                "taskId" uuid NOT NULL,
                "commentId" uuid,
                "event" "public"."notification_event_enum" NOT NULL,
                "message" character varying NOT NULL,
                "readAt" TIMESTAMP,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_notifications_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_notifications_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_notifications_task" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_notifications_comment" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE
            )`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TYPE "public"."notification_event_enum"`);
    }
}
