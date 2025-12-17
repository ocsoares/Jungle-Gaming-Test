import { Injectable } from "@nestjs/common";
import {
    INotificationCommentCreatedPayload,
    INotificationTaskCreatedPayload,
    INotificationTaskUpdatedPayload,
} from "@repo/contracts";
import { NotificationsGateway } from "./notifications.gateway";
import { INotificationRepository } from "./repositories/abstracts/notification.repository.interface";

@Injectable()
export class AppService {
    constructor(
        private readonly notificationRepository: INotificationRepository,
        private readonly notificationsGateway: NotificationsGateway,
    ) {}

    async taskCreated(payload: INotificationTaskCreatedPayload): Promise<void> {
        const result = await this.notificationRepository.taskCreated(payload);

        return this.notificationsGateway.emitTaskCreated(result);
    }

    async taskUpdated(payload: INotificationTaskUpdatedPayload): Promise<void> {
        const result = await this.notificationRepository.taskUpdated(payload);

        return this.notificationsGateway.emitTaskUpdated(result);
    }

    async commentCreated(
        payload: INotificationCommentCreatedPayload,
    ): Promise<void> {
        const result =
            await this.notificationRepository.commentCreated(payload);

        return this.notificationsGateway.emitCommentCreated(result);
    }
}
