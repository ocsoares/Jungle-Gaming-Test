import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class LoginDTO {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    @MaxLength(256)
    @IsString()
    readonly password: string;
}
