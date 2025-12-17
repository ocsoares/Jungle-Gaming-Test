import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { RpcToHttpExceptionFilter } from "./filters/rcp-to-http-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const GLOBAL_PREFIX = "api";

    app.setGlobalPrefix(GLOBAL_PREFIX);
    app.useGlobalFilters(new RpcToHttpExceptionFilter());

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    app.enableCors({
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    });

    const config = new DocumentBuilder()
        .setTitle("Jungle-Gaming-Test")
        .setVersion("1.0")
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("docs", app, document, {
        useGlobalPrefix: true,
    });

    await app.listen(Number(process.env.API_GATEWAY_PORT || 3001));

    Logger.log(
        `🚀 API Gateway is running on port ${process.env.API_GATEWAY_PORT || 3001}/${GLOBAL_PREFIX}`,
    );
}
bootstrap();
