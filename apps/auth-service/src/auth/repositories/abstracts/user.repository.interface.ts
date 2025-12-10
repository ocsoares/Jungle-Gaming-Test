import { UserEntity } from "@repo/typeorm/entities";

export abstract class IUserRepository {
    abstract findByEmail(email: string): Promise<UserEntity | null>;
    abstract findByUsername(username: string): Promise<UserEntity | null>;
}
