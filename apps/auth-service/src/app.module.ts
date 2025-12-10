import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import serverConfig from "@repo/config/server.config";
import { UserEntity } from "@repo/typeorm/entities";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { TypeOrmOwnModule } from "./database/typeormown.module";
import { IUserRepository } from "./repositories/abstracts/user.repository.interface";
import { UserRepository } from "./repositories/implementations/user.repository";

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
        TypeOrmOwnModule,
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: Number(process.env.JWT_EXPIRES_IN),
            },
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        { provide: IUserRepository, useClass: UserRepository },
    ],
    exports: [AuthService],
})
export class AppModule {}
