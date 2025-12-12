import { TaskEntity } from "@repo/typeorm/entities";
import { ITaskResponse } from "../response/task.response";

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
}
