import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.TCP,
            options: {
                host: String(process.env.TASK_SERVICE_HOST || "localhost"),
                port: Number(process.env.TASK_SERVICE_PORT),
            },
        },
    );

    await app.listen();

    Logger.log(
        `🚀 Task Service is running on port ${process.env.TASK_SERVICE_PORT} via TCP Protocol`,
    );
}
bootstrap();
