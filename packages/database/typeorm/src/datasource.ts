import { config } from "dotenv";
import path from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { TaskEntity, UserEntity } from "./entities";

// .env root
config({ path: path.resolve(__dirname, "../../../../.env") });

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [UserEntity, TaskEntity],
    migrations: ["src/database/migrations/*.ts"],
    synchronize: false,
});
