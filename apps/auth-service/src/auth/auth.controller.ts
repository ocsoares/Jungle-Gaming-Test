import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AUTH_SERVICE_LOGIN_MESSAGE } from "@repo/config/constants";
import { LoginDTO } from "@repo/contracts/auth";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern(AUTH_SERVICE_LOGIN_MESSAGE)
    async login(@Payload() payload: LoginDTO): Promise<string> {
        return await this.authService.login(payload);
    }
}
