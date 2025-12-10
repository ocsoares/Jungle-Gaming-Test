import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "@repo/typeorm/entities";
import { Repository } from "typeorm";
import { IUserRepository } from "../abstracts/user.repository.interface";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async findByEmail(email: string): Promise<UserEntity | null> {
        return await this.userRepository.findOneBy({ email });
    }

    async findByUsername(username: string): Promise<UserEntity | null> {
        return await this.userRepository.findOneBy({ username });
    }
}
