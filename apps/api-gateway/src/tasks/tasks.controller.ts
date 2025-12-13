import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Inject,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Query,
    UseGuards,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {
    TASK_SERVICE_CREATE_COMMENT_MESSAGE,
    TASK_SERVICE_CREATE_MESSAGE,
    TASK_SERVICE_DELETE_BY_ID_MESSAGE,
    TASK_SERVICE_GET_ALL_MESSAGE,
    TASK_SERVICE_GET_BY_ID_MESSAGE,
    TASK_SERVICE_NAME,
    TASK_SERVICE_UPDATE_BY_ID_MESSAGE,
} from "@repo/config/constants";
import {
    CreateCommentDTO,
    CreateTaskDTO,
    GetAllTasksDTO,
    UpdateTaskDTO,
    UpdateTaskMessage,
} from "@repo/contracts";
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

    @Get()
    async getAll(@Query() query: GetAllTasksDTO): Promise<any> {
        return await firstValueFrom(
            this.clientProxy.send(TASK_SERVICE_GET_ALL_MESSAGE, query),
        );
    }

    @Get(":id")
    async getById(
        @Param("id", new ParseUUIDPipe({ version: "4" })) payload: string,
    ): Promise<any> {
        return await firstValueFrom(
            this.clientProxy.send(TASK_SERVICE_GET_BY_ID_MESSAGE, payload),
        );
    }

    @Put(":id")
    async updateById(
        @Param("id", new ParseUUIDPipe({ version: "4" }))
        taskId: string,
        @Body() body: UpdateTaskDTO,
    ): Promise<any> {
        const payload: UpdateTaskMessage = {
            id: taskId,
            data: body,
        };

        return await firstValueFrom(
            this.clientProxy.send(TASK_SERVICE_UPDATE_BY_ID_MESSAGE, payload),
        );
    }

    @Delete(":id")
    @HttpCode(204)
    async deleteById(
        @Param("id", new ParseUUIDPipe({ version: "4" }))
        payload: string,
    ): Promise<void> {
        await firstValueFrom(
            this.clientProxy.send(TASK_SERVICE_DELETE_BY_ID_MESSAGE, payload),
        );
    }
}
