import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import serverConfig from "@repo/config/server.config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [
                ".env",
                "../../.env", // env raiz
            ],
            load: [serverConfig],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
