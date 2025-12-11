import { Injectable } from "@nestjs/common";
import { RegisterUserDTO } from "@repo/contracts/auth";
import * as bcrypt from "bcrypt";
import { IUserRepository } from "src/repositories/abstracts/user.repository.interface";
import {
    UserAlreadyExistsByEmail,
    UserAlreadyExistsByUsername,
} from "./exceptions/user.exceptions";
import { UserMapper } from "./mapper/user.mapper";
import { IUserResponse } from "./response/user.response";

@Injectable()
export class UserService {
    constructor(
        private userRepository: IUserRepository,
        private readonly userMapper: UserMapper,
    ) {}

    async register(data: RegisterUserDTO): Promise<IUserResponse> {
        const userByEmail = await this.userRepository.findByEmail(data.email);

        if (userByEmail) {
            throw new UserAlreadyExistsByEmail();
        }

        const userByUsername = await this.userRepository.findByUsername(
            data.username,
        );

        if (userByUsername) {
            throw new UserAlreadyExistsByUsername();
        }

        const userWithHashedPassword = {
            ...data,
            password: await bcrypt.hash(data.password, 10),
        };

        const userCreated = await this.userRepository.register(
            userWithHashedPassword,
        );

        return this.userMapper.toResponse(userCreated);
    }
}
