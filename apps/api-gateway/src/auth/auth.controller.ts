import { Body, Controller, HttpCode, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {
    AUTH_SERVICE_LOGIN_MESSAGE,
    AUTH_SERVICE_NAME,
    AUTH_SERVICE_REFRESH_LOGIN_MESSAGE,
    AUTH_SERVICE_REGISTER_MESSAGE,
} from "@repo/config/constants";
import { LoginDTO, RegisterUserDTO } from "@repo/contracts/auth/index";
import { firstValueFrom } from "rxjs";

@Controller("auth")
export class AuthController {
    constructor(
        @Inject(AUTH_SERVICE_NAME) private readonly clientProxy: ClientProxy,
    ) {}

    @Post("login")
    @HttpCode(200)
    async login(@Body() body: LoginDTO): Promise<any> {
        return await firstValueFrom(
            this.clientProxy.send(AUTH_SERVICE_LOGIN_MESSAGE, body),
        );
    }

    @Post("refresh")
    @HttpCode(200)
    async refreshLogin(@Body() body: LoginDTO): Promise<any> {
        return await firstValueFrom(
            this.clientProxy.send(AUTH_SERVICE_REFRESH_LOGIN_MESSAGE, body),
        );
    }

    @Post("register")
    async register(@Body() body: RegisterUserDTO): Promise<any> {
        return await firstValueFrom(
            this.clientProxy.send(AUTH_SERVICE_REGISTER_MESSAGE, body),
        );
    }
}
