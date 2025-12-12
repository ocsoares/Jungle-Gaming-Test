import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AUTH_SERVICE_REGISTER_MESSAGE } from "@repo/config/constants";
import { RegisterUserDTO } from "@repo/contracts/auth";
import { IUserResponse } from "./response/user.response";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @MessagePattern(AUTH_SERVICE_REGISTER_MESSAGE)
    async register(
        @Payload() payload: RegisterUserDTO,
    ): Promise<IUserResponse> {
        return await this.userService.register(payload);
    }
}
