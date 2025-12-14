import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import {
    TASK_SERVICE_CREATE_COMMENT_MESSAGE,
    TASK_SERVICE_GET_ALL_COMMENT_MESSAGE,
} from "@repo/config";
import { CreateCommentDTO, GetAllCommentsDTO } from "@repo/contracts";
import { CommentsService } from "./comments.service";
import {
    ICommentGetAllResponse,
    ICommentResponse,
} from "./response/comment.response";

@Controller("tasks")
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @MessagePattern(TASK_SERVICE_CREATE_COMMENT_MESSAGE)
    async create(
        @Payload() payload: CreateCommentDTO,
    ): Promise<ICommentResponse> {
        return await this.commentsService.create(payload);
    }

    @MessagePattern(TASK_SERVICE_GET_ALL_COMMENT_MESSAGE)
    async getAll(
        @Payload() payload: GetAllCommentsDTO,
    ): Promise<ICommentGetAllResponse> {
        return await this.commentsService.getAll(payload);
    }
}
