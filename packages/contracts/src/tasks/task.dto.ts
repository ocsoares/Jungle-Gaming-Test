import { OmitType, PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsUUID,
} from "class-validator";

enum Priority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    URGENT = "urgent",
}

enum Status {
    TODO = "todo",
    IN_PROGRESS = "in_progress",
    REVIEW = "review",
    DONE = "done",
}

export class CreateTaskDTO {
    @ApiProperty({ type: "string", example: "Configurar CI/CD GitHub Actions" })
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @ApiProperty({
        type: "string",
        example: "Pipeline no GitHub Actions para build e deploy automático",
    })
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @ApiProperty({
        type: "string",
        example: "2026-01-15T10:00:00-03:00",
    })
    @IsNotEmpty()
    @IsDateString() // ISO 8601 format, like "2025-12-31", "2025-12-31T23:59:00Z", "2025-12-31T23:59:00-03:00"...
    readonly due_date: string;

    @ApiProperty({
        enum: Priority,
        example: Priority.HIGH,
    })
    @IsNotEmpty()
    @IsEnum(Priority)
    readonly priority: Priority;

    @ApiProperty({
        enum: Status,
        example: Status.IN_PROGRESS,
    })
    @IsNotEmpty()
    @IsEnum(Status)
    readonly status: Status;

    @ApiProperty({
        type: "array",
        example: [
            "6f4bf0d0-6566-4581-919e-2a00327c7824",
            "be05c7fb-a326-453d-a989-54e8cccd0128",
        ],
    })
    @IsNotEmpty({ each: true })
    @IsString({ each: true })
    @IsUUID("4", { each: true })
    readonly usersId: string[];
}

export class GetAllTasksDTO {
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

export class UpdateTaskDTO extends PartialType(
    OmitType(CreateTaskDTO, ["usersId"]),
) {}

export class UpdateTaskMessage {
    readonly id: string;
    readonly data: UpdateTaskDTO;
}
