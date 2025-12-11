import { RegisterUserDTO } from "@repo/contracts/auth";
import { UserEntity } from "@repo/typeorm/entities";

export abstract class IUserRepository {
    abstract register(data: RegisterUserDTO): Promise<UserEntity>;
    abstract findByEmail(email: string): Promise<UserEntity | null>;
    abstract findByUsername(username: string): Promise<UserEntity | null>;
}
