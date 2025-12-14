import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {
    NOTIFICATION_SERVICE_NAME,
    NOTIFICATION_SERVICE_TASK_CREATED_MESSAGE,
    NOTIFICATION_SERVICE_TASK_UPDATED_MESSAGE,
} from "@repo/config";
import { CreateTaskDTO, GetAllTasksDTO, UpdateTaskDTO } from "@repo/contracts";
import { TaskNotFoundByIdException } from "src/comments/exceptions/comments.exceptionts";
import { ITaskRepository } from "src/repositories/abstracts/task.repository.interface";
import { IUserRepository } from "src/repositories/abstracts/user.repository.interface";
import { UserNotFoundByIdException } from "./exceptions/tasks.exceptions";
import { TaskMapper } from "./mapper/task.mapper";
import { ITaskGetAllResponse, ITaskResponse } from "./response/task.response";

@Injectable()
export class TasksService {
    constructor(
        @Inject(NOTIFICATION_SERVICE_NAME)
        private readonly clientProxy: ClientProxy,
        private readonly taskRepository: ITaskRepository,
        private readonly userRepository: IUserRepository,
        private readonly taskMapper: TaskMapper,
    ) {}

    async create(data: CreateTaskDTO): Promise<ITaskResponse> {
        const usersById = await this.userRepository.findByIds(data.usersId);

        const foundIds = new Set(usersById.map((user) => user.id));
        const missingIds = data.usersId.filter((id) => !foundIds.has(id));

        if (missingIds.length > 0) {
            throw new UserNotFoundByIdException();
        }

        const createdTask = await this.taskRepository.create({
            ...data,
            usersId: Array.from(foundIds),
        });

        this.clientProxy.emit(
            NOTIFICATION_SERVICE_TASK_CREATED_MESSAGE,
            createdTask.id,
        );

        return this.taskMapper.toResponse(createdTask);
    }

    async getAll({ page, size }: GetAllTasksDTO): Promise<ITaskGetAllResponse> {
        const [tasksEntityArray, total] = await this.taskRepository.getAll({
            page,
            size,
        });

        return this.taskMapper.toResponseGetAll(
            tasksEntityArray,
            { page, size },
            total,
        );
    }

    async getById(id: string): Promise<ITaskResponse> {
        const taskById = await this.taskRepository.findById(id);

        if (!taskById) {
            throw new TaskNotFoundByIdException();
        }

        return this.taskMapper.toResponse(taskById);
    }

    async updateById(id: string, data: UpdateTaskDTO): Promise<ITaskResponse> {
        const taskById = await this.taskRepository.findById(id);

        if (!taskById) {
            throw new TaskNotFoundByIdException();
        }

        const updatedTask = await this.taskRepository.updateById(
            taskById,
            data,
        );

        this.clientProxy.emit(
            NOTIFICATION_SERVICE_TASK_UPDATED_MESSAGE,
            updatedTask.id,
        );

        return this.taskMapper.toResponse(updatedTask);
    }

    async deleteById(id: string): Promise<void> {
        const taskById = await this.taskRepository.findById(id);

        if (!taskById) {
            throw new TaskNotFoundByIdException();
        }

        return await this.taskRepository.deleteById(taskById);
    }
}
