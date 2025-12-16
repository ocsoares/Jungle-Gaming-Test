import { Injectable } from "@nestjs/common";
import {
    INotificationCommentCreatedPayload,
    INotificationTaskCreatedPayload,
    INotificationTaskUpdatedPayload,
} from "@repo/contracts";
import { NotificationEntity } from "@repo/typeorm/entities";
import { INotificationRepository } from "./repositories/abstracts/notification.repository.interface";

@Injectable()
export class AppService {
    constructor(
        private readonly notificationRepository: INotificationRepository,
    ) {}

    async taskCreated(
        payload: INotificationTaskCreatedPayload,
    ): Promise<NotificationEntity[]> {
        return await this.notificationRepository.taskCreated(payload);
    }

    async taskUpdated(
        payload: INotificationTaskUpdatedPayload,
    ): Promise<NotificationEntity> {
        return this.notificationRepository.taskUpdated(payload);
    }

    async commentCreated(
        payload: INotificationCommentCreatedPayload,
    ): Promise<NotificationEntity> {
        return await this.notificationRepository.commentCreated(payload);
    }
}
