export class JwtPayload {
    readonly sub: string;
    readonly email: string;
    readonly username: string;
    readonly iat?: number;
    readonly exp?: number;
}
