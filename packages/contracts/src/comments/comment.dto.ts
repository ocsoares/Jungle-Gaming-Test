import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateCommentDTO {
    @IsNotEmpty()
    @IsString()
    readonly content: string;

    readonly taskId: string;

    @IsNotEmpty()
    @IsUUID("4")
    readonly authorId: string;
}
