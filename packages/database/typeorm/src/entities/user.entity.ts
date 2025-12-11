import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
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

    @CreateDateColumn()
    readonly createdAt: Date;

    @UpdateDateColumn()
    readonly updatedAt: Date;

    @ManyToMany(() => TaskEntity, (task) => task.users)
    tasks: TaskEntity[];
}
