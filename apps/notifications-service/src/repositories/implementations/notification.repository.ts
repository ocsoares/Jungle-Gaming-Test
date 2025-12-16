import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
    INotificationTaskCreatedPayload,
    INotificationTaskUpdatedPayload,
} from "@repo/contracts";
import { NotificationEntity } from "@repo/typeorm/entities";
import { Repository } from "typeorm";
import { INotificationRepository } from "../abstracts/notification.repository.interface";

@Injectable()
export class NotificationRepository implements INotificationRepository {
    constructor(
        @InjectRepository(NotificationEntity)
        private readonly notificationRepository: Repository<NotificationEntity>,
    ) {}

    async taskCreated(
        payload: INotificationTaskCreatedPayload,
    ): Promise<NotificationEntity[]> {
        const { id: taskId, usersId, event } = payload.data;

        const notifications = usersId.map((userId) =>
            this.notificationRepository.create({
                user: { id: userId },
                task: { id: taskId },
                event,
            }),
        );

        return await this.notificationRepository.save(notifications);
    }

    async taskUpdated(
        payload: INotificationTaskUpdatedPayload,
    ): Promise<NotificationEntity> {
        const { id: taskId, event } = payload.data;

        const notifications = this.notificationRepository.create({
            task: { id: taskId },
            event,
        });

        console.log("taskUpdated NOTIFICATIONS:", notifications);

        return await this.notificationRepository.save(notifications);
    }
}
