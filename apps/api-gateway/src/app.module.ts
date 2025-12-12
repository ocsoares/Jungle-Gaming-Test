import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AUTH_SERVICE_NAME, TASK_SERVICE_NAME } from "@repo/config/constants";
import serverConfig from "@repo/config/server.config";
import { AuthController } from "./auth/auth.controller";
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
    controllers: [AuthController, TasksController],
    providers: [],
})
export class AppModule {}
