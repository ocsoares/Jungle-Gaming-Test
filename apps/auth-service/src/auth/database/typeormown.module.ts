import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import serverConfig, { IServerConfig } from "@repo/config/server.config";
import { UserEntity } from "@repo/typeorm/entities";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [
                ".env", // .env do microsserviço
                "../../.env", // .env da raiz
            ],
            load: [serverConfig],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                const pg =
                    config.get<IServerConfig["postgres"]>("server.postgres");

                // 👇 Aqui você verifica no console
                console.log(
                    "Postgres config carregado ------------------------:",
                    pg,
                );

                return {
                    type: "postgres",
                    host: pg!.host,
                    port: pg!.port,
                    username: pg!.username,
                    password: pg!.password,
                    database: pg!.database,
                    entities: [UserEntity],
                    synchronize: true,
                };
            },
        }),
    ],
    exports: [TypeOrmModule],
})
export class TypeOrmOwnModule {}
