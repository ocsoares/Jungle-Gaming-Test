import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
    INotificationTaskCreatedPayload,
    NotificationEvent,
} from "@repo/contracts";
import {
    NotificationEntity,
    TaskEntity,
    UserEntity,
} from "@repo/typeorm/entities";
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
        const { id: taskId, usersId } = payload.data;

        const notifications = usersId.map((userId) =>
            this.notificationRepository.create({
                user: { id: userId } as UserEntity,
                task: { id: taskId } as TaskEntity,
                event: NotificationEvent.TASK_CREATED,
            }),
        );

        return await this.notificationRepository.save(notifications);
    }
}
