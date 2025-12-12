import { UserEntity } from "@repo/typeorm/entities";

export abstract class IUserRepository {
    abstract findByIds(ids: string[]): Promise<UserEntity[]>;
}
