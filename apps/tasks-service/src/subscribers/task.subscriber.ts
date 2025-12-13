import { Logger } from "@nestjs/common";
import {
    TaskAction,
    TaskEntity,
    TaskHistoryEntity,
} from "@repo/typeorm/entities";
import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    RemoveEvent,
    UpdateEvent,
} from "typeorm";

@EventSubscriber()
export class TaskSubscriber implements EntitySubscriberInterface<TaskEntity> {
    private readonly logger = new Logger(TaskSubscriber.name);

    listenTo() {
        return TaskEntity;
    }

    private async saveHistory(
        event:
            | InsertEvent<TaskEntity>
            | UpdateEvent<TaskEntity>
            | RemoveEvent<TaskEntity>,
        taskId: string,
        action: TaskAction,
        changes?: Record<string, any>,
    ) {
        const historyRepo = event.connection.getRepository(TaskHistoryEntity);

        await historyRepo.save({ taskId, action, changes });
        this.logger.debug(
            `Histórico registrado: ${action} para Task ${taskId}`,
        );
    }

    async afterInsert(event: InsertEvent<TaskEntity>) {
        if (!event.entity) return;
        await this.saveHistory(
            event,
            event.entity.id,
            TaskAction.CREATED,
            event.entity,
        );
    }

    async afterUpdate(event: UpdateEvent<TaskEntity>) {
        if (!event.entity) return;

        const changes = event.updatedColumns.map((col) => ({
            column: col.propertyName,
            value: (event.entity as any)[col.propertyName],
        }));

        await this.saveHistory(
            event,
            event.entity.id,
            TaskAction.UPDATED,
            changes,
        );
    }

    async afterRemove(event: RemoveEvent<TaskEntity>) {
        if (!event.entityId) return;
        await this.saveHistory(
            event,
            event.entityId as string,
            TaskAction.DELETED,
        );
    }
}
