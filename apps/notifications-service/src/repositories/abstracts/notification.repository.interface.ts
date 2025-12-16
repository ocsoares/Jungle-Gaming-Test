import {
    INotificationCommentCreatedPayload,
    INotificationTaskCreatedPayload,
    INotificationTaskUpdatedPayload,
} from "@repo/contracts";
import { NotificationEntity } from "@repo/typeorm/entities";

export abstract class INotificationRepository {
    abstract taskCreated(
        payload: INotificationTaskCreatedPayload,
    ): Promise<NotificationEntity[]>;

    abstract taskUpdated(
        payload: INotificationTaskUpdatedPayload,
    ): Promise<NotificationEntity>;

    abstract commentCreated(
        payload: INotificationCommentCreatedPayload,
    ): Promise<NotificationEntity>;
}
