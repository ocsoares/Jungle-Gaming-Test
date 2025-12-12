import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {
    TASK_SERVICE_CREATE_MESSAGE,
    TASK_SERVICE_NAME,
} from "@repo/config/constants";
import { CreateTaskDTO } from "@repo/contracts";
import { firstValueFrom } from "rxjs";
import { AuthGuard } from "src/guards/auth/auth.guard";

@UseGuards(AuthGuard)
@Controller("tasks")
export class TasksController {
    constructor(
        @Inject(TASK_SERVICE_NAME) private readonly clientProxy: ClientProxy,
    ) {}

    @Post()
    async create(@Body() body: CreateTaskDTO): Promise<any> {
        return await firstValueFrom(
            this.clientProxy.send(TASK_SERVICE_CREATE_MESSAGE, body),
        );
    }
}
