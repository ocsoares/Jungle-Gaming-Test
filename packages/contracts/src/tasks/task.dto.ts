import { IsDateString, IsEnum, IsNotEmpty, IsString } from "class-validator";

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
}
