import { Request, Response } from "express";
import { ChangeTasksCompletedStateUC } from "../../../business/usecase/tasks/changeTasksCompletedState";
import { TasksDB } from "../../../data/tasksDataBase";
import { JwtAuthorizer } from "../../lambda/services/jwtAuthorizer";

export const ChangeTasksCompletedStateEndpoint = async (req: Request, res: Response) => {
    try{
        const changeTasksCompletedStateUC = new ChangeTasksCompletedStateUC(new TasksDB(), new JwtAuthorizer());
        let auth = req.headers.authorization || req.headers.Authorization;

        const result = await changeTasksCompletedStateUC.execute({
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