import type { MigrationInterface, QueryRunner } from "typeorm";

export class TurnsNotificationUserIdOptional1766013583147 implements MigrationInterface {
    name = "TurnsNotificationUserIdOptional1766013583147";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "notifications" ALTER COLUMN "userId" DROP NOT NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "notifications" ALTER COLUMN "userId" SET NOT NULL`,
        );
    }
}
