import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDTO } from "@repo/contracts/auth";
import * as bcrypt from "bcrypt";
import { IUserRepository } from "../repositories/abstracts/user.repository.interface";
import { InvalidUserCredentialsRpcException } from "./exceptions/user/user.exceptions";
import { JwtPayload } from "./types/jwt-payload.type";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly jwtService: JwtService,
    ) {}

    async login(data: LoginDTO): Promise<string> {
        const userByEmail = await this.userRepository.findByEmail(data.email);

        if (!userByEmail) {
            throw new InvalidUserCredentialsRpcException();
        }

        // ver isso certo pq acho q NÃO vai vir da Entity a "password" !!!!
        const isPasswordValid = await bcrypt.compare(
            data.password,
            userByEmail.password,
        );

        if (!isPasswordValid) {
            throw new InvalidUserCredentialsRpcException();
        }

        const payload: JwtPayload = {
            sub: userByEmail.id,
            email: userByEmail.email,
            username: userByEmail.username,
        };

        return await this.jwtService.signAsync(payload);
    }
}
