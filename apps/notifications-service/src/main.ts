import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [
                    `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_HOST}:5672`,
                ],
                queue: process.env.RABBITMQ_QUEUE || "notifications_queue",
                queueOptions: { durable: true },
            },
        },
    );

    await app.listen();

    Logger.log("🚀 Notifications Service is running with RabbitMQ");
}
bootstrap();
