import { GetAllTasksDTO } from "@repo/contracts";
import { TaskEntity } from "@repo/typeorm/entities";
import { ITaskGetAllResponse, ITaskResponse } from "../response/task.response";

export class TaskMapper {
    toResponse(data: TaskEntity): ITaskResponse {
        return {
            title: data.title,
            description: data.description,
            due_date: data.due_date.toString(),
            priority: data.priority,
            status: data.status,
        };
    }

    toResponseArray(data: TaskEntity[]): ITaskResponse[] {
        return data.map((task) => this.toResponse(task));
    }

    toResponseGetAll(
        data: TaskEntity[],
        { page, size }: GetAllTasksDTO,
        total: number,
    ): ITaskGetAllResponse {
        return {
            data: this.toResponseArray(data),
            total,
            page,
            size,
            totalPages: Math.ceil(total / size),
        };
    }
}
