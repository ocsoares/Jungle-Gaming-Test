import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskDTO } from "@repo/contracts";
import { TaskEntity } from "@repo/typeorm/entities";
import { Repository } from "typeorm";
import { ITaskRepository } from "../abstract/task.repository.interface";

@Injectable()
export class TaskRepository implements ITaskRepository {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
    ) {}

    async create(data: CreateTaskDTO): Promise<TaskEntity> {
        const taskCreated = this.taskRepository.create(data);

        return await this.taskRepository.save(taskCreated);
    }
}
