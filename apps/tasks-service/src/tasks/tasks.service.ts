import { Injectable } from "@nestjs/common";
import { CreateTaskDTO } from "@repo/contracts";
import { ITaskRepository } from "src/repositories/abstracts/task.repository.interface";
import { IUserRepository } from "src/repositories/abstracts/user.repository.interface";
import { UserNotFoundByIdException } from "./exceptions/tasks.exceptions";
import { TaskMapper } from "./mapper/task.mapper";
import { ITaskResponse } from "./response/task.response";

// TODO
// Terminar o CRUD dessas TASKS (e PROTEGER as Rotas)

@Injectable()
export class TasksService {
    constructor(
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

        // Publicar evento no BROKER do RabbitMQ !!!!

        return this.taskMapper.toResponse(
            createdTask,
            usersById.map((user) => user.id),
        );
    }
}
