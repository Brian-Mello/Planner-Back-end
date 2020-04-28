import { BaseDB } from "./baseDatabase"
import { UsersGateway } from "../business/gateways/usersGateway"
import { User } from "../business/entites/users"

export class UsersDB extends BaseDB implements UsersGateway{
    private userTableName = "users"

    private mapUsersToDB(input?: any): User | undefined{
        return(
            input &&
            new User(
                input.id,
            )
        )
    }

    public async signup(user: User): Promise<void>{
        await this.connection.raw(`
            INSERT INTO ${this.userTableName} ( id )
            VALUES(
                '${user.getId()}'
            )
        `)
    }

    public async login(id: string): Promise<User | undefined>{
        const result = await this.connection.raw(`
            SELECT *
            FROM ${this.userTableName}
            WHERE id='${id}'
        `)

        if(!result[0][0]){
            return undefined;
        }

        return await this.mapUsersToDB(result[0][0])
    }

    public async getUserById(id: string): Promise<User | undefined>{
        const result = await this.connection.raw(`
            SELECT *
            FROM ${this.userTableName}
            WHERE id='${id}'
        `)

        if(!result[0][0]){
            return undefined;
        }

        return await this.mapUsersToDB(result[0][0])
    }
}