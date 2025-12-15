import { Type } from "class-transformer";
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
} from "class-validator";

export class CreateCommentDTO {
    @IsNotEmpty()
    @IsString()
    readonly content: string;

    @IsOptional() // to Gateway DTO
    readonly taskId: string;

    @IsNotEmpty()
    @IsUUID("4")
    readonly authorId: string;
}

export class GetAllCommentsDTO {
    @IsOptional() // to Gateway DTO
    readonly taskId: string;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    readonly page: number;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    readonly size: number;
}
