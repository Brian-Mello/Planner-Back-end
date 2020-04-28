import { BaseDB } from "./baseDatabase";

export class RefreshTokenDB extends BaseDB implements RefreshTokenGateway{

    private refreshTokenTableName = "refreshToken";

    public async createRefreshToken(input: RefreshToken): Promise<void>{
        await this.connection.raw(`
            INSERT INTO ${this.refreshTokenTableName}(token, user_id)
            VALUES(
                '${input.token}', 
                '${input.user_id}'
            );
        `);
    }

    public async deleteRefreshToken(user_id: string): Promise<void>{
        await this.connection.raw(`
            DELETE FROM ${this.refreshTokenTableName}
            WHERE user_id = '${user_id}';
        `);
    };

    public async getRefreshToken(user_id: string): Promise<RefreshToken | undefined>{
        const result = await this.connection.raw(`
            SELECT * 
            FROM ${this.refreshTokenTableName}
            WHERE user_id = '${user_id}';
        `);

        if(!result[0][0]){
            return undefined;
        };

        return result[0][0] && {
            token: result[0][0].token,
            user_id: result[0][0].user_id
        };
    };

}