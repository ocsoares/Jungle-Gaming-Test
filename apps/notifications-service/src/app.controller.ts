import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import {
    NOTIFICATION_SERVICE_COMMENT_CREATED_MESSAGE,
    NOTIFICATION_SERVICE_TASK_CREATED_MESSAGE,
    NOTIFICATION_SERVICE_TASK_UPDATED_MESSAGE,
} from "@repo/config";
import {
    INotificationCommentCreatedPayload,
    INotificationTaskCreatedPayload,
    INotificationTaskUpdatedPayload,
} from "@repo/contracts/notifications";
import { AppService } from "./app.service";

// TODO
// PERSISTIR as Notifications no Banco

// - Ver oq fazer aqui nesse Websocket...
// - README detalhado...

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @MessagePattern(NOTIFICATION_SERVICE_TASK_CREATED_MESSAGE)
    async handleTaskCreated(
        @Payload() payload: INotificationTaskCreatedPayload,
    ): Promise<any> {
        await this.appService.taskCreated(payload);
    }

    @MessagePattern(NOTIFICATION_SERVICE_TASK_UPDATED_MESSAGE)
    async handleTaskUpdated(
        @Payload() payload: INotificationTaskUpdatedPayload,
    ): Promise<any> {
        console.log("payload no handleTaskUpdated:---------", payload);

        await this.appService.taskUpdated(payload);
    }

    @MessagePattern(NOTIFICATION_SERVICE_COMMENT_CREATED_MESSAGE)
    async handleCommentCreated(
        @Payload() payload: INotificationCommentCreatedPayload,
    ): Promise<any> {
        console.log("payload no handleCommentCreated:---------", payload);
    }
}
