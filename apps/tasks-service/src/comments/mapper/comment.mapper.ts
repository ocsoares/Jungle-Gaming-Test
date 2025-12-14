import { GetAllCommentsDTO } from "@repo/contracts";
import { CommentEntity } from "@repo/typeorm/entities";
import {
    ICommentGetAllResponse,
    ICommentResponse,
} from "../response/comment.response";

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

    toResponseArray(data: CommentEntity[], taskId: string): ICommentResponse[] {
        return data.map((comment) =>
            this.toResponse(comment, taskId, comment.author.id),
        );
    }

    toResponseGetAll(
        data: CommentEntity[],
        { taskId, page, size }: GetAllCommentsDTO,
        total: number,
    ): ICommentGetAllResponse {
        return {
            data: this.toResponseArray(data, taskId),
            total,
            page,
            size,
            totalPages: Math.ceil(total / size),
        };
    }
}
