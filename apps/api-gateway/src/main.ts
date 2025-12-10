import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { RpcToHttpExceptionFilter } from "./filters/rcp-to-http-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const GLOBAL_PREFIX = "api";

    app.setGlobalPrefix(GLOBAL_PREFIX);
    app.useGlobalFilters(new RpcToHttpExceptionFilter());

    await app.listen(Number(process.env.API_GATEWAY_PORT));

    Logger.log(
        `🚀 API Gateway is running on port ${process.env.API_GATEWAY_PORT}/${GLOBAL_PREFIX}`,
    );
}
bootstrap();
