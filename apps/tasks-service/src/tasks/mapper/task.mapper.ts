import { TaskEntity } from "@repo/typeorm/entities";
import { ITaskResponse } from "../response/task.response";

export class TaskMapper {
    toResponse(data: TaskEntity): ITaskResponse {
        return { ...data, due_date: data.due_date.toString() };
    }
}
