import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TerminusModule } from "@nestjs/terminus";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { AUTH_SERVICE_NAME, TASK_SERVICE_NAME } from "@repo/config/constants";
import serverConfig from "@repo/config/server.config";
import { AuthController } from "./auth/auth.controller";
import { HealthController } from "./health/health.controller";
import { TasksController } from "./tasks/tasks.controller";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [
                ".env",
                "../../.env", // env raiz
            ],
            load: [serverConfig],
        }),
        ThrottlerModule.forRoot({
            throttlers: [
                {
                    ttl: Number(process.env.GATEWAY_TTL) || 1000,
                    limit: Number(process.env.GATEWAY_LIMIT) || 10,
                },
            ],
        }),
        TerminusModule,
        ClientsModule.register([
            {
                name: AUTH_SERVICE_NAME,
                transport: Transport.TCP,
                options: {
                    host: String(process.env.AUTH_SERVICE_HOST || "localhost"),
                    port: Number(process.env.AUTH_SERVICE_PORT),
                },
            },
            {
                name: TASK_SERVICE_NAME,
                transport: Transport.TCP,
                options: {
                    host: String(process.env.TASK_SERVICE_HOST || "localhost"),
                    port: Number(process.env.TASK_SERVICE_PORT),
                },
            },
        ]),
    ],
    controllers: [AuthController, TasksController, HealthController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {}
