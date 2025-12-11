import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDTO } from "@repo/contracts/auth";
import * as bcrypt from "bcrypt";
import { IUserRepository } from "../repositories/abstracts/user.repository.interface";
import { InvalidUserCredentialsRpcException } from "./exceptions/user/user.exceptions";
import { ILoginResponse } from "./response/login.response";
import { JwtPayload } from "./types/jwt-payload.type";
import { TokenUtils } from "./utils/token.utils";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly jwtService: JwtService,
        private readonly tokenUtils: TokenUtils,
    ) {}

    async login(data: LoginDTO): Promise<ILoginResponse> {
        const payload = await this.validateCredentials(data);

        return await this.tokenUtils.generateAccessToken(
            this.jwtService,
            payload,
        );
    }

    async loginRefresh(data: LoginDTO): Promise<ILoginResponse> {
        const payload = await this.validateCredentials(data);

        return await this.tokenUtils.generateRefreshToken(
            this.jwtService,
            payload,
        );
    }

    private async validateCredentials(data: LoginDTO): Promise<JwtPayload> {
        const userByEmail = await this.userRepository.findByEmail(data.email);

        if (!userByEmail) {
            throw new InvalidUserCredentialsRpcException();
        }

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

        return payload;
    }
}
