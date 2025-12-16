import { Injectable } from "@nestjs/common";
import { INotificationTaskCreatedPayload } from "@repo/contracts";
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
}
