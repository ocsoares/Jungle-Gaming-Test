import {
    OnGatewayConnection,
    WebSocketGateway,
    WebSocketServer,
} from "@nestjs/websockets";
import {
    NOTIFICATION_SERVICE_COMMENT_CREATED_MESSAGE,
    NOTIFICATION_SERVICE_TASK_CREATED_MESSAGE,
    NOTIFICATION_SERVICE_TASK_UPDATED_MESSAGE,
} from "@repo/config";
import { NotificationEntity } from "@repo/typeorm/entities";
import * as jwt from "jsonwebtoken";
import { Server, Socket } from "socket.io";

@WebSocketGateway(3004, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
})
export class NotificationsGateway implements OnGatewayConnection {
    @WebSocketServer()
    private readonly server: Server;

    async handleConnection(client: Socket): Promise<void> {
        try {
            const token =
                client.handshake.auth?.token ||
                (client.handshake.headers?.authorization?.startsWith("Bearer ")
                    ? client.handshake.headers.authorization.slice(
                          "Bearer ".length,
                      )
                    : undefined);

            if (!token) {
                client.emit("error", { message: "Missing auth token" });
                client.disconnect(true);

                return;
            }
            const secret = process.env.JWT_SECRET || "jwtpass123"; // in Developtment
            const payload = jwt.verify(token, secret);

            (client as any).data = { ...(client as any).data, user: payload };

            if (typeof (payload as any)?.sub === "string") {
                client.join(`user:${(payload as any).sub}`);
            }
        } catch {
            client.emit("error", { message: "Invalid or expired token" });
            client.disconnect(true);
        }
    }

    emitTaskCreated(payload: NotificationEntity[]): void {
        this.server.emit(NOTIFICATION_SERVICE_TASK_CREATED_MESSAGE, payload);
    }

    emitTaskUpdated(payload: NotificationEntity): void {
        this.server.emit(NOTIFICATION_SERVICE_TASK_UPDATED_MESSAGE, payload);
    }

    emitCommentCreated(payload: NotificationEntity): void {
        this.server.emit(NOTIFICATION_SERVICE_COMMENT_CREATED_MESSAGE, payload);
    }
}
