import {
    Body,
    Controller,
    Inject,
    Param,
    ParseUUIDPipe,
    Post,
    UseGuards,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {
    TASK_SERVICE_CREATE_COMMENT_MESSAGE,
    TASK_SERVICE_CREATE_MESSAGE,
    TASK_SERVICE_NAME,
} from "@repo/config/constants";
import { CreateCommentDTO, CreateTaskDTO } from "@repo/contracts";
import { firstValueFrom } from "rxjs";
import { AuthGuard } from "src/guards/auth/auth.guard";

@UseGuards(AuthGuard)
@Controller("tasks")
export class TasksController {
    constructor(
        @Inject(TASK_SERVICE_NAME) private readonly clientProxy: ClientProxy,
    ) {}

    @Post()
    async createTask(@Body() body: CreateTaskDTO): Promise<any> {
        return await firstValueFrom(
            this.clientProxy.send(TASK_SERVICE_CREATE_MESSAGE, body),
        );
    }

    @Post(":id/comments")
    async createComment(
        @Param("id", new ParseUUIDPipe({ version: "4" }))
        taskId: string,
        @Body() body: CreateCommentDTO,
    ): Promise<any> {
        const payload = { ...body, taskId };

        return await firstValueFrom(
            this.clientProxy.send(TASK_SERVICE_CREATE_COMMENT_MESSAGE, payload),
        );
    }
}
