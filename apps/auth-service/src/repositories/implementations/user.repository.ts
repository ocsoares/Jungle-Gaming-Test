import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterUserDTO } from "@repo/contracts/auth";
import { UserEntity } from "@repo/typeorm/entities";
import { Repository } from "typeorm";
import { IUserRepository } from "../abstracts/user.repository.interface";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async register(data: RegisterUserDTO): Promise<UserEntity> {
        const userCreated = this.userRepository.create({
            email: data.email,
            username: data.username,
            password: data.password,
        });

        return await this.userRepository.save(userCreated);
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return await this.userRepository.findOne({
            where: { email },
            select: [
                "id",
                "username",
                "email",
                "password", // for some reason the password field was omitted
                "createdAt",
                "updatedAt",
            ],
        });
    }

    async findByUsername(username: string): Promise<UserEntity | null> {
        return await this.userRepository.findOneBy({ username });
    }
}
