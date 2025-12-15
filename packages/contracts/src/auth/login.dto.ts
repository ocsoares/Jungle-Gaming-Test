import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class LoginDTO {
    @ApiProperty({ type: "string", example: "user@gmail.com" })
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({ type: "string", example: "user123" })
    @IsNotEmpty()
    @MaxLength(256)
    @IsString()
    readonly password: string;
}
