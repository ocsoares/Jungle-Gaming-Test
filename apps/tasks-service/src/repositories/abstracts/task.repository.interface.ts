import { CreateTaskDTO, GetAllTasksDTO } from "@repo/contracts";
import { TaskEntity } from "@repo/typeorm/entities";

export abstract class ITaskRepository {
    abstract create(data: CreateTaskDTO): Promise<TaskEntity>;
    abstract findById(id: string): Promise<TaskEntity | null>;
    abstract getAll(data: GetAllTasksDTO): Promise<[TaskEntity[], number]>;
}
