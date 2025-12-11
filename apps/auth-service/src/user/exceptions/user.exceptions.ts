import { BadRequestException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

export class UserAlreadyExistsByEmail extends RpcException {
    static readonly EXCEPTION_MESSAGE =
        "There is already a user registered with this email";

    constructor() {
        super(
            new BadRequestException(UserAlreadyExistsByEmail.EXCEPTION_MESSAGE),
        );
    }
}

export class UserAlreadyExistsByUsername extends RpcException {
    static readonly EXCEPTION_MESSAGE =
        "There is already a user registered with this username";

    constructor() {
        super(
            new BadRequestException(
                UserAlreadyExistsByUsername.EXCEPTION_MESSAGE,
            ),
        );
    }
}
