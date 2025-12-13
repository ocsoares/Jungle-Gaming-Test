import { InjectRepository } from "@nestjs/typeorm";
import { CreateCommentDTO } from "@repo/contracts";
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
}
