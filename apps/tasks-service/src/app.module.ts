import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import serverConfig from "@repo/config/server.config";
import { CommentEntity, TaskEntity, UserEntity } from "@repo/typeorm/entities";
import { TypeOrmOwnModule } from "./database/typeormown.module";
import { ITaskRepository } from "./repositories/abstracts/task.repository.interface";
import { IUserRepository } from "./repositories/abstracts/user.repository.interface";
import { TaskRepository } from "./repositories/implementations/task.repository";
import { UserRepository } from "./repositories/implementations/user.repository";
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
        TypeOrmModule.forFeature([TaskEntity, UserEntity, CommentEntity]),
    ],
    controllers: [TasksController],
    providers: [
        TasksService,
        {
            provide: ITaskRepository,
            useClass: TaskRepository,
        },
        {
            provide: IUserRepository,
            useClass: UserRepository,
        },
        TaskMapper,
    ],
})
export class AppModule {}
