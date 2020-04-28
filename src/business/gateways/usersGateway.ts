import { User } from "../entites/users";

export interface UsersGateway {
    signup(user: User): Promise<void>;
    login(id: string): Promise<User | undefined>;
    getUserById(id: string): Promise<User | undefined>;
}