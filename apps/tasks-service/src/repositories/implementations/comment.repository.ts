import { InjectRepository } from "@nestjs/typeorm";
import { CreateCommentDTO, GetAllCommentsDTO } from "@repo/contracts";
import { CommentEntity } from "@repo/typeorm/entities";
import { Repository } from "typeorm";
import { ICommentRepository } from "../abstracts/comment.repository.interface";

export class CommentRepository implements ICommentRepository {
    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
    ) {}

    async create(data: CreateCommentDTO): Promise<CommentEntity> {
        const commentCreated = this.commentRepository.create({
            content: data.content,
            task: { id: data.taskId },
            author: { id: data.authorId },
        });

        return this.commentRepository.save(commentCreated);
    }

    async getAll({
        taskId,
        page,
        size,
    }: GetAllCommentsDTO): Promise<[CommentEntity[], number]> {
        return await this.commentRepository.findAndCount({
            where: { task: { id: taskId } },
            skip: (page - 1) * size,
            take: size,
            order: { createdAt: "DESC" },
        });
    }
}
