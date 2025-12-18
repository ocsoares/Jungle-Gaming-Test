import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { CommentEntity } from "./comment.entity";
import { TaskEntity } from "./task.entity";
import { UserEntity } from "./user.entity";

export enum NotificationEvent {
    TASK_CREATED = "TASK_CREATED",
    TASK_UPDATED = "TASK_UPDATED",
    TASK_DELETED = "TASK_DELETED",
}

@Entity({ name: "notifications" })
export class NotificationEntity {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @ManyToOne(() => UserEntity, { onDelete: "CASCADE", nullable: true })
    readonly user?: UserEntity;

    @ManyToOne(() => TaskEntity, { onDelete: "CASCADE" })
    readonly task: TaskEntity;

    @ManyToOne(() => CommentEntity, { onDelete: "CASCADE", nullable: true })
    readonly comment?: CommentEntity;

    @Column({
        type: "enum",
        enum: NotificationEvent,
    })
    event!: NotificationEvent;

    @CreateDateColumn()
    readonly createdAt: Date;

    @UpdateDateColumn()
    readonly updatedAt: Date;
}
