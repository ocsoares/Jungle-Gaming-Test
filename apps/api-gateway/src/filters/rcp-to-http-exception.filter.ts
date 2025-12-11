// apps/api-gateway/src/filters/rpc-to-http-exception.filter.ts
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

interface NormalizedError {
    status: number;
    message: string;
    error: string;
}

@Catch()
export class RpcToHttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const { status, message, error } = this.normalizeException(exception);

        response.status(status).json({
            statusCode: status,
            message,
            error,
        });
    }

    private normalizeException(exception: unknown): NormalizedError {
        if (exception instanceof RpcException) {
            return this.extractError(exception.getError());
        }

        if (exception instanceof HttpException) {
            return this.extractError(
                exception.getResponse(),
                exception.getStatus(),
                exception.message,
            );
        }

        if (exception && typeof exception === "object") {
            return this.extractError(exception as any);
        }

        return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
            error: "Error",
        };
    }

    private extractError(
        source: any,
        fallbackStatus: number = HttpStatus.INTERNAL_SERVER_ERROR,
        fallbackMessage: string = "Internal server error",
    ): NormalizedError {
        let status = source?.statusCode ?? source?.status ?? fallbackStatus;

        if (typeof status !== "number" || isNaN(status)) {
            status = fallbackStatus;
        }

        const message =
            source?.message ?? source?.response?.message ?? fallbackMessage;

        const error = source?.error ?? source?.response?.error ?? "Error";

        return { status, message, error };
    }
}
