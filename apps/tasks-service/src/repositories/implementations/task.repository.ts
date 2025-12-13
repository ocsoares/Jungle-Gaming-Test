import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskDTO, GetAllTasksDTO, UpdateTaskDTO } from "@repo/contracts";
import { TaskEntity } from "@repo/typeorm/entities";
import { Repository } from "typeorm";
import { ITaskRepository } from "../abstracts/task.repository.interface";

@Injectable()
export class TaskRepository implements ITaskRepository {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
    ) {}

    async create(data: CreateTaskDTO): Promise<TaskEntity> {
        const taskCreated = this.taskRepository.create({
            ...data,
            users: data.usersId.map((userId) => ({ id: userId })),
        });

        return await this.taskRepository.save(taskCreated);
    }

    async findById(id: string): Promise<TaskEntity | null> {
        return await this.taskRepository.findOneBy({ id });
    }

    async getAll({
        page,
        size,
    }: GetAllTasksDTO): Promise<[TaskEntity[], number]> {
        return await this.taskRepository.findAndCount({
            skip: (page - 1) * size,
            take: size,
            order: { createdAt: "DESC" },
        });
    }

    async updateById(
        entity: TaskEntity,
        updateData: UpdateTaskDTO,
    ): Promise<TaskEntity> {
        Object.assign(entity, updateData);

        return await this.taskRepository.save(entity);
    }

    async deleteById(entity: TaskEntity): Promise<void> {
        await this.taskRepository.remove(entity);
    }
}
