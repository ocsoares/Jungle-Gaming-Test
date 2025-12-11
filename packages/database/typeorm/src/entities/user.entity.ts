import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

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
}
