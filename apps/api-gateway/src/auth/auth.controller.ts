import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {
    AUTH_SERVICE_LOGIN_MESSAGE,
    AUTH_SERVICE_NAME,
} from "@repo/config/constants";
import { LoginDTO } from "@repo/contracts/auth/index";
import { firstValueFrom } from "rxjs";

@Controller("auth")
export class AuthController {
    constructor(
        @Inject(AUTH_SERVICE_NAME) private readonly clientProxy: ClientProxy,
    ) {}

    @Post("login")
    async login(@Body() body: LoginDTO) {
        return await firstValueFrom(
            this.clientProxy.send(AUTH_SERVICE_LOGIN_MESSAGE, body),
        );
    }
}
