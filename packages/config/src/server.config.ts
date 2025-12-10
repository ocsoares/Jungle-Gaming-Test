import { registerAs } from "@nestjs/config";

export interface IServerConfig {
    postgres: {
        host?: string;
        port?: number;
        username?: string;
        password?: string;
        database?: string;
    };
}

export default registerAs<IServerConfig>("server", () => {
    return {
        postgres: {
            host: process.env.POSTGRES_HOST || "localhost",
            port: process.env.POSTGRES_PORT
                ? parseInt(process.env.POSTGRES_PORT, 10)
                : 5432,
            username: process.env.POSTGRES_USER || "postgres",
            password: process.env.POSTGRES_PASSWORD || "postgres",
            database: process.env.POSTGRES_DB || "postgres",
        },
    };
});
