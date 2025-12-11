import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

enum Priority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    URGENT = "urgent",
}

enum Status {
    TODO = "todo",
    IN_PROGRESS = "in_progress",
    REVIEW = "review",
    DONE = "done",
}

@Entity({ name: "tasks" })
export class TaskEntity {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column()
    readonly title: string;

    @Column()
    readonly description: string;

    @Column({ type: "timestamp" })
    readonly due_date: Date;

    @Column({ type: "enum", enum: Priority, default: Priority.MEDIUM })
    readonly priority: Priority;

    @Column({ type: "enum", enum: Status })
    readonly status: Status;

    @CreateDateColumn()
    readonly createdAt: Date;

    @UpdateDateColumn()
    readonly updatedAt: Date;

    @ManyToMany(() => UserEntity, (user) => user.tasks)
    @JoinTable({
        name: "tasks_users", // tabela de junção
        joinColumn: { name: "task_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "user_id", referencedColumnName: "id" },
    })
    users: UserEntity[];
}
