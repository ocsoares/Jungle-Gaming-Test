import { Injectable } from "@nestjs/common";
import { LoginDTO } from "@repo/contracts/auth";
import { IUserRepository } from "./repositories/abstracts/user.repository.interface";

@Injectable()
export class AuthService {
    constructor(private readonly userRepository: IUserRepository) {}

    async login(data: LoginDTO): Promise<any> {
        const userByEmail = await this.userRepository.findByEmail(data.email);

        console.log("userByEmail", userByEmail);

        return data;
    }
}
