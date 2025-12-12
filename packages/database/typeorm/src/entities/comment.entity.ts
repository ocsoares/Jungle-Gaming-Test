import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { TaskEntity } from "./task.entity";
import { UserEntity } from "./user.entity";

@Entity("comments")
export class CommentEntity {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column()
    readonly content: string;

    @ManyToOne(() => TaskEntity, (task) => task.comments, {
        onDelete: "CASCADE",
    })
    readonly task: TaskEntity;

    @ManyToOne(() => UserEntity, (user) => user.comments, { eager: true })
    readonly author: UserEntity;

    @CreateDateColumn()
    readonly createdAt: Date;

    @UpdateDateColumn()
    readonly updatedAt: Date;
}
