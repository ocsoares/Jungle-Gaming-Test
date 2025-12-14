import { CreateCommentDTO, GetAllCommentsDTO } from "@repo/contracts";
import { CommentEntity } from "@repo/typeorm/entities";

export abstract class ICommentRepository {
    abstract create(data: CreateCommentDTO): Promise<CommentEntity>;
    abstract getAll({
        page,
        size,
    }: GetAllCommentsDTO): Promise<[CommentEntity[], number]>;
}
