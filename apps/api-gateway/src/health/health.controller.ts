import { Controller, Get } from "@nestjs/common";
import { Transport } from "@nestjs/microservices";
import {
    HealthCheck,
    HealthCheckService,
    HttpHealthIndicator,
    MicroserviceHealthIndicator,
} from "@nestjs/terminus";

@Controller("health")
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private microservice: MicroserviceHealthIndicator,
        private http: HttpHealthIndicator,
    ) {}

    @Get("liveness")
    liveness() {
        return { status: "ok", timestamp: new Date() };
    }

    @Get("readiness")
    @HealthCheck()
    readiness() {
        return this.health.check([
            // RabbitMQ
            () =>
                this.microservice.pingCheck("rabbitmq", {
                    transport: Transport.RMQ,
                    options: {
                        urls: [
                            `amqp://${process.env.RABBITMQ_DEFAULT_USER || "rabbit"}:${process.env.RABBITMQ_DEFAULT_PASS || "rabbit123"}@${process.env.RABBITMQ_HOST || "rabbitmq"}:5672`,
                        ],
                        queue:
                            process.env.RABBITMQ_QUEUE || "notifications_queue",
                    },
                }),

            // API Gateway
            () =>
                this.http.pingCheck(
                    "api-gateway",
                    `http://${process.env.API_GATEWAY_HOST || "api-gateway"}:${
                        process.env.API_GATEWAY_PORT || 3001
                    }/api/health/liveness`,
                ),

            // Auth Service
            () =>
                this.microservice.pingCheck("auth-service", {
                    transport: Transport.TCP,
                    options: {
                        host: process.env.AUTH_SERVICE_HOST || "auth-service",
                        port: Number(process.env.AUTH_SERVICE_PORT || 3002),
                    },
                }),

            // Task Service
            () =>
                this.microservice.pingCheck("task-service", {
                    transport: Transport.TCP,
                    options: {
                        host: process.env.TASK_SERVICE_HOST || "tasks-service",
                        port: Number(process.env.TASK_SERVICE_PORT || 3003),
                    },
                }),

            // Notification Service
            () =>
                this.microservice.pingCheck("notifications-service", {
                    transport: Transport.TCP,
                    options: {
                        host:
                            process.env.NOTIFICATIONS_SERVICE_HOST ||
                            "notifications-service",
                        port: Number(
                            process.env.NOTIFICATIONS_SERVICE_PORT || 3004,
                        ),
                    },
                }),

            // Web
            // () =>
            //     this.http.pingCheck(
            //         "web",
            //         `http://${process.env.WEB_HOST || "web"}:${process.env.WEB_PORT || 5173}`,
            //     ),
        ]);
    }
}
