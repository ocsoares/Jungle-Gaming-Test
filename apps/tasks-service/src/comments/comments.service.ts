import { Injectable } from "@nestjs/common";
import { CreateCommentDTO } from "@repo/contracts";
import { ICommentRepository } from "src/repositories/abstracts/comment.repository.interface";
import { ITaskRepository } from "src/repositories/abstracts/task.repository.interface";
import { IUserRepository } from "src/repositories/abstracts/user.repository.interface";
import {
    TaskNotFoundByIdException,
    UserNotFoundByIdException,
} from "./exceptions/comments.exceptionts";
import { CommentMapper } from "./mapper/comment.mapper";
import { ICommentResponse } from "./response/comment.response";

@Injectable()
export class CommentsService {
    constructor(
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

        return this.commentMapper.toResponse(
            commentCreated,
            data.taskId,
            data.authorId,
        );
    }
}
