import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import {
    TASK_SERVICE_CREATE_MESSAGE,
    TASK_SERVICE_GET_ALL_MESSAGE,
    TASK_SERVICE_GET_BY_ID_MESSAGE,
} from "@repo/config";
import { CreateTaskDTO, GetAllTasksDTO } from "@repo/contracts";
import { ITaskGetAllResponse, ITaskResponse } from "./response/task.response";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @MessagePattern(TASK_SERVICE_CREATE_MESSAGE)
    async create(@Payload() payload: CreateTaskDTO): Promise<ITaskResponse> {
        return await this.tasksService.create(payload);
    }

    @MessagePattern(TASK_SERVICE_GET_ALL_MESSAGE)
    async getAll(
        @Payload() payload: GetAllTasksDTO,
    ): Promise<ITaskGetAllResponse> {
        return await this.tasksService.getAll(payload);
    }

    @MessagePattern(TASK_SERVICE_GET_BY_ID_MESSAGE)
    async getById(@Payload() payload: string): Promise<ITaskResponse> {
        return await this.tasksService.getById(payload);
    }
}
