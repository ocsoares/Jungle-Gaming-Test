import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class RegisterUserDTO {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @MaxLength(256)
    @IsString()
    readonly password: string;
}
