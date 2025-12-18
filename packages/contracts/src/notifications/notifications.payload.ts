export interface TaskPayloadDTO {
    id: string;
    title: string;
    description: string;
    due_date: Date;
    priority: "low" | "medium" | "high" | "urgent";
    status: "todo" | "in_progress" | "review" | "done";
    createdAt: Date;
    updatedAt: Date;
}

export enum NotificationEvent {
    TASK_CREATED = "TASK_CREATED",
    TASK_UPDATED = "TASK_UPDATED",
    COMMENT_NEW = "COMMENT_NEW",
}

export interface INotificationTaskCreatedPayload {
    readonly data: Omit<TaskPayloadDTO, "users" | "comments"> & {
        usersId: string[];
        event: NotificationEvent;
    };
}

export interface INotificationTaskUpdatedPayload {
    readonly data: Omit<TaskPayloadDTO, "users" | "comments"> & {
        event: NotificationEvent;
    };
}

export interface INotificationCommentCreatedPayload {
    readonly data: {
        id: string;
        content: string;
        taskId: string;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
        event: NotificationEvent;
    };
}
