import { Request, Response } from "express";
import { CreateTaskUC } from "../../../business/usecase/tasks/createTask";
import { TasksDB } from "../../../data/tasksDataBase";
import { JwtAuthorizer } from "../../lambda/services/jwtAuthorizer";

export const CreateTaskEndpoint = async (req: Request, res: Response) => {
    try{
        const createTaskUC = new CreateTaskUC( new TasksDB(), new JwtAuthorizer());

        const auth = req.headers.authorization || req.headers.Authorization;

        const result = await createTaskUC.execute({
            text: req.body.text,
            day: req.body.day,
            token: auth as string
        });


        res.status(200).send(result);
    }catch(err){
        res.status(400).send({
            message: err.message
        });
    };
};