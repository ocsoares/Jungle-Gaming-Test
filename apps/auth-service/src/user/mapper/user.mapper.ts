import { UserEntity } from "@repo/typeorm/entities";
import { IUserResponse } from "../response/user.response";

export class UserMapper {
    toResponse({ email, username }: UserEntity): IUserResponse {
        return {
            email,
            username,
        };
    }
}
