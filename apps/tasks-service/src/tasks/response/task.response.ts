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

export interface ITaskResponse {
    readonly title: string;
    readonly description: string;
    readonly due_date: string;
    readonly priority: Priority;
    readonly status: Status;
}
