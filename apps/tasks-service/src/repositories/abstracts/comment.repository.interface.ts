import { CreateCommentDTO } from "@repo/contracts";
import { CommentEntity } from "@repo/typeorm/entities";

export abstract class ICommentRepository {
    abstract create(data: CreateCommentDTO): Promise<CommentEntity>;
}
