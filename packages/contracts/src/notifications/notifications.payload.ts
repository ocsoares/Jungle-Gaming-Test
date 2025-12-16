import { TaskEntity } from "@repo/typeorm/entities";

export enum NotificationEvent {
    TASK_CREATED = "TASK_CREATED",
    TASK_UPDATED = "TASK_UPDATED",
    COMMENT_NEW = "COMMENT_NEW",
}

export interface INotificationTaskCreatedPayload {
    readonly data: Omit<TaskEntity, "users" | "comments"> & {
        usersId: string[];
        event: NotificationEvent;
    };
}

export interface INotificationTaskUpdatedPayload {
    readonly data: Omit<TaskEntity, "users" | "comments"> & {
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
