import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import {
  NOTIFICATION_SERVICE_COMMENT_CREATED_MESSAGE,
  NOTIFICATION_SERVICE_TASK_CREATED_MESSAGE,
  NOTIFICATION_SERVICE_TASK_UPDATED_MESSAGE,
} from "@repo/config";
import { AppService } from "./app.service";

// TODO
// - Swagger completo no Gateway (/api/docs)
// - Dockerfile de TODOS
// - Ver oq fazer aqui nesse Websocket...

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @MessagePattern(NOTIFICATION_SERVICE_TASK_CREATED_MESSAGE)
    async handleTaskCreated(@Payload() payload: string): Promise<any> {
        console.log("payload no handleTaskCreated:---------", payload);
    }

    @MessagePattern(NOTIFICATION_SERVICE_TASK_UPDATED_MESSAGE)
    async handleTaskUpdated(@Payload() payload: string): Promise<any> {
        console.log("payload no handleTaskUpdated:---------", payload);
    }

    @MessagePattern(NOTIFICATION_SERVICE_COMMENT_CREATED_MESSAGE)
    async handleCommentCreated(@Payload() payload: string): Promise<any> {
        console.log("payload no handleCommentCreated:---------", payload);
    }
}
