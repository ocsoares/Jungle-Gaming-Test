import { registerAs } from "@nestjs/config";

export interface IServerConfig {
    postgres: {
        host?: string;
        port?: number;
        username?: string;
        password?: string;
        database?: string;
    };
    rabbitmq: {
        username?: string;
        password?: string;
    };
    auth_service: {
        host?: string;
        port?: number;
    };
    task_service: {
        host?: string;
        port?: number;
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
            password: process.env.POSTGRES_PASSWORD || "postgres123",
            database: process.env.POSTGRES_DB || "postgres_db",
        },
        rabbitmq: {
            username: process.env.RABBITMQ_DEFAULT_USER || "rabbit",
            password: process.env.RABBITMQ_DEFAULT_PASS || "rabbit123",
        },
        auth_service: {
            host: process.env.AUTH_SERVICE_HOST,
            port: Number(process.env.AUTH_SERVICE_PORT),
        },
        task_service: {
            host: process.env.TASK_SERVICE_HOST,
            port: Number(process.env.TASK_SERVICE_PORT),
        },
    };
});
