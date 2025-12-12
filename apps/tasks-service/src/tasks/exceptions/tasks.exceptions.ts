import { BadRequestException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

export class UserNotFoundByIdException extends RpcException {
    static readonly EXCEPTION_MESSAGE = "User(s) not found by ID !";

    constructor() {
        super(
            new BadRequestException(
                UserNotFoundByIdException.EXCEPTION_MESSAGE,
            ),
        );
    }
}
