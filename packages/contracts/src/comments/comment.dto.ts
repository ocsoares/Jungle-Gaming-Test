import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateCommentDTO {
    @IsNotEmpty()
    @IsString()
    readonly content: string;

    readonly taskId: string;

    @IsNotEmpty()
    @IsUUID("4")
    readonly authorId: string;
}

export class GetAllCommentsDTO {
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
