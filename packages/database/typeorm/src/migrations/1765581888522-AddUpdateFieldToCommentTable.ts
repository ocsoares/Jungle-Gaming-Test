import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddUpdateFieldToCommentTable1765581888522 implements MigrationInterface {
    name = "AddUpdateFieldToCommentTable1765581888522";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "comments" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "comments" DROP COLUMN "updatedAt"`,
        );
    }
}
