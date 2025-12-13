import { CommentEntity } from "@repo/typeorm/entities";
import { ICommentResponse } from "../response/comment.response";

export class CommentMapper {
    toResponse(
        data: CommentEntity,
        taskId: string,
        authorId: string,
    ): ICommentResponse {
        return {
            content: data.content,
            taskId,
            authorId,
        };
    }
}
