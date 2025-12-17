import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import serverConfig from "@repo/config/server.config";
import { NotificationEntity } from "@repo/typeorm/entities";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmOwnModule } from "./database/typeormown.module";
import { NotificationsGateway } from "./notifications.gateway";
import { INotificationRepository } from "./repositories/abstracts/notification.repository.interface";
import { NotificationRepository } from "./repositories/implementations/notification.repository";

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
        TypeOrmOwnModule,
        TypeOrmModule.forFeature([NotificationEntity]),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        { provide: INotificationRepository, useClass: NotificationRepository },
        NotificationsGateway,
    ],
})
export class AppModule {}
