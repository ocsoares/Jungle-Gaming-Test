import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {
    NOTIFICATION_SERVICE_COMMENT_CREATED_MESSAGE,
    NOTIFICATION_SERVICE_NAME,
} from "@repo/config";
import {
    CreateCommentDTO,
    GetAllCommentsDTO,
    INotificationCommentCreatedPayload,
    NotificationEvent,
} from "@repo/contracts";
import { ICommentRepository } from "src/repositories/abstracts/comment.repository.interface";
import { ITaskRepository } from "src/repositories/abstracts/task.repository.interface";
import { IUserRepository } from "src/repositories/abstracts/user.repository.interface";
import {
    TaskNotFoundByIdException,
    UserNotFoundByIdException,
} from "./exceptions/comments.exceptionts";
import { CommentMapper } from "./mapper/comment.mapper";
import {
    ICommentGetAllResponse,
    ICommentResponse,
} from "./response/comment.response";

@Injectable()
export class CommentsService {
    constructor(
        @Inject(NOTIFICATION_SERVICE_NAME)
        private readonly clientProxy: ClientProxy,
        private readonly commentRepository: ICommentRepository,
        private readonly userRepository: IUserRepository,
        private readonly taskRepository: ITaskRepository,
        private readonly commentMapper: CommentMapper,
    ) {}

    async create(data: CreateCommentDTO): Promise<ICommentResponse> {
        const userById = await this.userRepository.findById(data.authorId);

        if (!userById) {
            throw new UserNotFoundByIdException();
        }

        const taskById = await this.taskRepository.findById(data.taskId);

        if (!taskById) {
            throw new TaskNotFoundByIdException();
        }

        const commentCreated = await this.commentRepository.create(data);

        const payload: INotificationCommentCreatedPayload = {
            data: {
                id: commentCreated.id,
                content: commentCreated.content,
                taskId: commentCreated.task.id,
                authorId: commentCreated.author.id,
                createdAt: commentCreated.createdAt,
                updatedAt: commentCreated.updatedAt,
                event: NotificationEvent.COMMENT_NEW,
            },
        };

        this.clientProxy.emit(
            NOTIFICATION_SERVICE_COMMENT_CREATED_MESSAGE,
            payload,
        );

        return this.commentMapper.toResponse(
            commentCreated,
            data.taskId,
            data.authorId,
        );
    }

    async getAll({
        taskId,
        page,
        size,
    }: GetAllCommentsDTO): Promise<ICommentGetAllResponse> {
        const taskById = await this.taskRepository.findById(taskId);

        if (!taskById) {
            throw new TaskNotFoundByIdException();
        }

        const [commentsEntityArray, total] =
            await this.commentRepository.getAll({
                taskId,
                page,
                size,
            });

        return this.commentMapper.toResponseGetAll(
            commentsEntityArray,
            { taskId, page, size },
            total,
        );
    }
}
