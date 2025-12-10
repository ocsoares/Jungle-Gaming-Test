import { BadRequestException } from "@nestjs/common";

export class InvalidUserCredentials extends BadRequestException {
    static readonly EXCEPTION_MESSAGE = "The user credentials are invalid";

    constructor() {
        super(InvalidUserCredentials.EXCEPTION_MESSAGE);
    }
}
