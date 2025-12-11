import { JwtService } from "@nestjs/jwt";
import { ILoginResponse } from "../response/login.response";
import { JwtPayload } from "../types/jwt-payload.type";

export class TokenUtils {
    async generateAccessToken(
        jwtService: JwtService,
        payload: JwtPayload,
    ): Promise<ILoginResponse> {
        return {
            token: await jwtService.signAsync(payload), // default expiresIn from module
        };
    }

    async generateRefreshToken(
        jwtService: JwtService,
        payload: JwtPayload,
    ): Promise<ILoginResponse> {
        return {
            token: await jwtService.signAsync(payload, {
                expiresIn: Number(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN),
            }),
        };
    }
}
