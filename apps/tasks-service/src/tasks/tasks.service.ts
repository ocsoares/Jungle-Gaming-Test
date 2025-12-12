import { Injectable } from "@nestjs/common";
import { CreateTaskDTO } from "@repo/contracts";
import { ITaskRepository } from "src/repositories/abstract/task.repository.interface";
import { TaskMapper } from "./mapper/task.mapper";
import { ITaskResponse } from "./response/task.response";

@Injectable()
export class TasksService {
    constructor(
        private readonly taskRepository: ITaskRepository,
        private readonly taskMapper: TaskMapper,
    ) {}

    async create(data: CreateTaskDTO): Promise<ITaskResponse> {
        const createdTask = await this.taskRepository.create(data);

        return this.taskMapper.toResponse(createdTask);
    }
}
