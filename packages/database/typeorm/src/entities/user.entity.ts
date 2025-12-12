import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { CommentEntity } from "./comment.entity";
import { TaskEntity } from "./task.entity";

@Entity({ name: "users" })
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column({ unique: true })
    readonly username: string;

    @Column({ unique: true })
    readonly email: string;

    @Column({ length: 256 })
    readonly password: string;

    @ManyToMany(() => TaskEntity, (task) => task.users)
    readonly tasks: TaskEntity[];

    @OneToMany(() => CommentEntity, (comment) => comment.author)
    readonly comments: CommentEntity[];

    @CreateDateColumn()
    readonly createdAt: Date;

    @UpdateDateColumn()
    readonly updatedAt: Date;
}
