import { UnauthorizedException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

export class InvalidUserCredentialsRpcException extends RpcException {
    static readonly EXCEPTION_MESSAGE = "The user credentials are invalid";

    constructor() {
        super(
            new UnauthorizedException(
                InvalidUserCredentialsRpcException.EXCEPTION_MESSAGE,
            ),
        );
    }
}
