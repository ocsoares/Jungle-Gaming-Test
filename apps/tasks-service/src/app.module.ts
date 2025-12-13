import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import serverConfig from "@repo/config/server.config";
import { CommentEntity, TaskEntity, UserEntity } from "@repo/typeorm/entities";
import { CommentsController } from "./comments/comments.controller";
import { CommentsService } from "./comments/comments.service";
import { CommentMapper } from "./comments/mapper/comment.mapper";
import { TypeOrmOwnModule } from "./database/typeormown.module";
import { ICommentRepository } from "./repositories/abstracts/comment.repository.interface";
import { ITaskRepository } from "./repositories/abstracts/task.repository.interface";
import { IUserRepository } from "./repositories/abstracts/user.repository.interface";
import { CommentRepository } from "./repositories/implementations/comment.repository";
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
    controllers: [TasksController, CommentsController],
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
        {
            provide: ICommentRepository,
            useClass: CommentRepository,
        },
        TaskMapper,
        CommentsService,
        CommentMapper,
    ],
})
export class AppModule {}
