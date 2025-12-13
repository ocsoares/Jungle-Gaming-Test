import { BadRequestException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

export class UserNotFoundByIdException extends RpcException {
    static readonly EXCEPTION_MESSAGE = "User not found by ID";

    constructor() {
        super(
            new BadRequestException(
                UserNotFoundByIdException.EXCEPTION_MESSAGE,
            ),
        );
    }
}

export class TaskNotFoundByIdException extends RpcException {
    static readonly EXCEPTION_MESSAGE = "Task not found by ID";

    constructor() {
        super(
            new BadRequestException(
                TaskNotFoundByIdException.EXCEPTION_MESSAGE,
            ),
        );
    }
}
