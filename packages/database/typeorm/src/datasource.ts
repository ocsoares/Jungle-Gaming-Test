import { config } from "dotenv";
import path from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";
import {
    CommentEntity,
    TaskEntity,
    TaskHistoryEntity,
    UserEntity,
} from "./entities";

// .env root
config({ path: path.resolve(__dirname, "../../../../.env") });

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "db",
    port: Number(process.env.POSTGRES_PORT || 5432),
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres123",
    database: process.env.POSTGRES_DB || "postgres_db",
    entities: [UserEntity, TaskEntity, CommentEntity, TaskHistoryEntity],
    migrations: ["src/migrations/*.ts"],
});
