import { UserEntity } from "@repo/typeorm/entities";
import { config } from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";

// .env root
config({ path: "../../.env" });

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [UserEntity],
    migrations: ["src/database/migrations/*.ts"],
});
