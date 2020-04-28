import { Request, Response } from "express";
import { ChangeTaskCompletedStateUC } from "../../../business/usecase/tasks/changeTaskCompletedState";
import { TasksDB } from "../../../data/tasksDataBase";
import { JwtAuthorizer } from "../../lambda/services/jwtAuthorizer";

export const ChangeTaskCompletedStateEndpoint = async (req: Request, res: Response) => {
    try{
        const changeTaskCompletedStateUC = new ChangeTaskCompletedStateUC(new TasksDB(), new JwtAuthorizer());
        let auth = req.headers.authorization || req.headers.Authorization;

        const result = await changeTaskCompletedStateUC.execute({
            id: req.params.id,
            token: auth as string,
            completed: req.body.completed
        });

        res.status(200).send(result);
    }catch(err){
        res.status(400).send({
            message: err.message
        });
    };
};