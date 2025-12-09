import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class LoginDTO {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    @MaxLength(256)
    readonly password: string;
}
