import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

export enum TaskAction {
    CREATED = "CREATED",
    UPDATED = "UPDATED",
    DELETED = "DELETED",
}

@Entity({ name: "task_histories" })
export class TaskHistoryEntity {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column()
    readonly taskId: string;

    @Column({ type: "enum", enum: TaskAction })
    readonly action: TaskAction;

    @Column("jsonb", { nullable: true })
    readonly changes?: Record<string, any>;

    @CreateDateColumn()
    readonly createdAt: Date;

    @UpdateDateColumn()
    readonly updatedAt: Date;
}
