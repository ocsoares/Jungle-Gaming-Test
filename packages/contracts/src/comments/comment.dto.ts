import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
} from "class-validator";

export class CreateCommentDTO {
    @ApiProperty({
        type: "string",
        example: "Essa tarefa está muito difícil !",
    })
    @IsNotEmpty()
    @IsString()
    readonly content: string;

    @IsOptional() // to Gateway DTO
    readonly taskId: string;

    @ApiProperty({
        type: "string",
        example: "6f4bf0d0-6566-4581-919e-2a00327c7824",
    })
    @IsNotEmpty()
    @IsUUID("4")
    readonly authorId: string;
}

export class GetAllCommentsDTO {
    @IsOptional() // to Gateway DTO
    readonly taskId: string;

    @ApiProperty({
        type: Number,
        example: 1,
    })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    readonly page: number;

    @ApiProperty({
        type: Number,
        example: 5,
    })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    readonly size: number;
}
