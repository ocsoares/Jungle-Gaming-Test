import { UnauthorizedException } from "@nestjs/common";

export class MissingTokenException extends UnauthorizedException {
    static readonly EXCEPTION_MESSAGE = "Authorization token is missing";

    constructor() {
        super(MissingTokenException.EXCEPTION_MESSAGE);
    }
}

export class InvalidTokenException extends UnauthorizedException {
    static readonly EXCEPTION_MESSAGE = "Authorization token is invalid";

    constructor() {
        super(InvalidTokenException.EXCEPTION_MESSAGE);
    }
}
