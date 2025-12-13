import { OmitType, PartialType } from "@nestjs/mapped-types";
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
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsDateString() // ISO 8601 format, like "2025-12-31", "2025-12-31T23:59:00Z", "2025-12-31T23:59:00-03:00"...
    readonly due_date: string;

    @IsNotEmpty()
    @IsEnum(Priority)
    readonly priority: Priority;

    @IsNotEmpty()
    @IsEnum(Status)
    readonly status: Status;

    @IsNotEmpty({ each: true })
    @IsString({ each: true })
    @IsUUID("4", { each: true })
    readonly usersId: string[];
}

export class GetAllTasksDTO {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    readonly page: number;

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
