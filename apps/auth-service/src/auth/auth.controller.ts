import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { LoginDTO } from "@repo/contracts/auth";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern("auth-login")
    async login(@Payload() payload: LoginDTO) {
        console.log("no auth-service CONTROLLER feijao");

        return await this.authService.login(payload);
    }
}
