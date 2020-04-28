import { Request, Response } from "express";
import { CheckUserUC } from "../../../business/usecase/users/checkUser";
import { JwtAuthorizer } from "../../lambda/services/jwtAuthorizer";
import { RefreshTokenDB } from "../../../data/refreshTokenDataBase";
import { UsersDB } from "../../../data/usersDataBase";

export const CheckUsersEndpoint = async (req: Request, res: Response) => {
    try{
        const checkUserUC = new CheckUserUC( new UsersDB(), new JwtAuthorizer(), new RefreshTokenDB());

        const result = await checkUserUC.execute({
            id: req.body.id
        });

        res.status(200).send(result);
    } catch(err){
        res.status(400).send({
            message: err.message
        });
    };
};