import { UsersGateway } from "../../gateways/usersGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { v4 } from 'uuid'
import { User } from "../../entites/users";

export class CheckUserUC {
    constructor(
        private usersGateway: UsersGateway,
        private authenticationGateway: AuthenticationGateway,
        private refreshTokenGateway: RefreshTokenGateway
    ){}

    public async execute(input: CheckUserUCInput): Promise<CheckUserUCOutput>{
        let user = await this.usersGateway.getUserById(input.id);

        let accessToken: any;

        let refreshToken: any;

        let refreshTokenForUser: any;

        let message: any;
        
        if(user){

            await this.usersGateway.login(input.id);

            message = "Usuário logado com sucesso"

            accessToken = this.authenticationGateway.generateToken({
                id: user.getId(),
            }, process.env.ACCESS_TOKEN_TIME as string);
    
            refreshToken = this.authenticationGateway.generateToken({
                id: user.getId(),
            }, process.env.REFRESH_TOKEN_TIME as string);
    
            refreshTokenForUser = await this.refreshTokenGateway.getRefreshToken(
                user.getId()
            );
    
            if(refreshTokenForUser){
                await this.refreshTokenGateway.deleteRefreshToken(user.getId());
            };
    
            await this.refreshTokenGateway.createRefreshToken({
                token: refreshToken,
                user_id: user.getId(),
            });

        } else if(!user){

            const newUser = new User(
                input.id
            );

            await this.usersGateway.signup(newUser);

            message = "Usuário Criado com sucesso"

            accessToken = this.authenticationGateway.generateToken({
                id: newUser.getId(),
            }, process.env.ACCESS_TOKEN_TIME as string);

            refreshToken = this.authenticationGateway.generateToken({
                id: newUser.getId(),
            }, process.env.REFRESH_TOKEN_TIME as string);

            refreshTokenForUser = await this.refreshTokenGateway.getRefreshToken(
                newUser.getId()
            );

            if(refreshTokenForUser){
                await this.refreshTokenGateway.deleteRefreshToken(newUser.getId());
            };

            await this.refreshTokenGateway.createRefreshToken({
                token: refreshToken,
                user_id: newUser.getId(),
            });
        };

        return {
            message: message,
            accessToken: accessToken,
            refreshToken: refreshToken
        };
    };
};

export interface CheckUserUCInput {
    id: string;
};

export interface CheckUserUCOutput {
    message: string;
    accessToken: string;
    refreshToken: string;
};