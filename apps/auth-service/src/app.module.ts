import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "@repo/typeorm/entities";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { TypeOrmOwnModule } from "./auth/database/typeormown.module";
import { IUserRepository } from "./auth/repositories/abstracts/user.repository.interface";
import { UserRepository } from "./auth/repositories/implementations/user.repository";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmOwnModule,
        TypeOrmModule.forFeature([UserEntity]),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        { provide: IUserRepository, useClass: UserRepository },
    ],
    exports: [AuthService],
})
export class AppModule {}
