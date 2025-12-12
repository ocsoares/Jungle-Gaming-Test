import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {
  AUTH_SERVICE_NAME,
  AUTH_SERVICE_VALIDATE_TOKEN_MESSAGE,
} from "@repo/config/constants";
import { IValidateTokenResponse } from "@repo/contracts";
import { firstValueFrom } from "rxjs";
import {
  InvalidTokenException,
  MissingTokenException,
} from "../exceptions/auth.guard.exception";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(AUTH_SERVICE_NAME) private readonly clientProxy: ClientProxy,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers["authorization"] as string;

        if (!authHeader) {
            throw new MissingTokenException();
        }

        const [, token] = authHeader.split(" ");

        const result = (await firstValueFrom(
            this.clientProxy.send(AUTH_SERVICE_VALIDATE_TOKEN_MESSAGE, token),
        )) as IValidateTokenResponse;

        if (!result.valid) {
            throw new InvalidTokenException();
        }

        req.user = {
            id: result.token?.sub,
            email: result.token?.email,
            username: result.token?.username,
        };

        return true;
    }
}
