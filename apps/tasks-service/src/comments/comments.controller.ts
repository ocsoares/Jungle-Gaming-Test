import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { TASK_SERVICE_CREATE_COMMENT_MESSAGE } from "@repo/config";
import { CreateCommentDTO } from "@repo/contracts";
import { CommentsService } from "./comments.service";
import { ICommentResponse } from "./response/comment.response";

@Controller("tasks")
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @MessagePattern(TASK_SERVICE_CREATE_COMMENT_MESSAGE)
    async create(
        @Payload() payload: CreateCommentDTO,
    ): Promise<ICommentResponse> {
        return await this.commentsService.create(payload);
    }
}
