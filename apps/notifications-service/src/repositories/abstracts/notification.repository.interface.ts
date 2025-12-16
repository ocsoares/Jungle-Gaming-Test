import { INotificationTaskCreatedPayload } from "@repo/contracts";
import { NotificationEntity } from "@repo/typeorm/entities";

export abstract class INotificationRepository {
    abstract taskCreated(
        payload: INotificationTaskCreatedPayload,
    ): Promise<NotificationEntity[]>;
}
