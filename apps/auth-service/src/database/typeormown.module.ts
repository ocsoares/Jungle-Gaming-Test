import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IServerConfig } from "@repo/config/server.config";
import { TaskEntity, UserEntity } from "@repo/typeorm/entities";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                const pg =
                    config.get<IServerConfig["postgres"]>("server.postgres");

                return {
                    type: "postgres",
                    host: pg!.host,
                    port: pg!.port,
                    username: pg!.username,
                    password: pg!.password,
                    database: pg!.database,
                    entities: [UserEntity, TaskEntity],
                };
            },
        }),
    ],
    exports: [TypeOrmModule],
})
export class TypeOrmOwnModule {}
