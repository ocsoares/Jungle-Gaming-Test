import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { TASK_SERVICE_CREATE_MESSAGE } from "@repo/config";
import { CreateTaskDTO } from "@repo/contracts";
import { ITaskResponse } from "./response/task.response";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @MessagePattern(TASK_SERVICE_CREATE_MESSAGE)
    async create(@Payload() payload: CreateTaskDTO): Promise<ITaskResponse> {
        return await this.tasksService.create(payload);
    }
}
