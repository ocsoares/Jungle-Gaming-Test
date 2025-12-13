import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "@repo/typeorm/entities";
import { In, Repository } from "typeorm";
import { IUserRepository } from "../abstracts/user.repository.interface";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async findByIds(ids: string[]): Promise<UserEntity[]> {
        return await this.userRepository.findBy({ id: In(ids) });
    }

    async findById(id: string): Promise<UserEntity | null> {
        return await this.userRepository.findOneBy({ id });
    }
}
