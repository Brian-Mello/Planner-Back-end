import { Request, Response } from "express";
import { GetTasksUC } from "../../../business/usecase/tasks/getTasks";
import { TasksDB } from "../../../data/tasksDataBase";
import { JwtAuthorizer } from "../../lambda/services/jwtAuthorizer";

export const GetTasksEndpoint = async (req: Request,  res: Response) => {
    try{
        const getTasksUC = new GetTasksUC( new TasksDB(), new JwtAuthorizer());

        let auth = req.headers.authorization || req.headers.Authorization;

        const result = await getTasksUC.execute({
            token: auth as string
        });

        res.status(200).send(result);
    } catch(err){
        res.status(400).send({
            message: err.message
        });
    };
};