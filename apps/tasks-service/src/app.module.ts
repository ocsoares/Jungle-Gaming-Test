import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import serverConfig from "@repo/config/server.config";
import { TaskEntity } from "@repo/typeorm/entities";
import { TypeOrmOwnModule } from "./database/typeormown.module";
import { ITaskRepository } from "./repositories/abstract/task.repository.interface";
import { TaskRepository } from "./repositories/implementations/task.repository";
import { TaskMapper } from "./tasks/mapper/task.mapper";
import { TasksController } from "./tasks/tasks.controller";
import { TasksService } from "./tasks/tasks.service";

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
        TypeOrmModule.forFeature([TaskEntity]),
    ],
    controllers: [TasksController],
    providers: [
        TasksService,
        {
            provide: ITaskRepository,
            useClass: TaskRepository,
        },
        TaskMapper,
    ],
})
export class AppModule {}
