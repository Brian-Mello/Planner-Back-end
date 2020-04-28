import { Request, Response } from "express";
import { UpdateTaskUC } from "../../../business/usecase/tasks/updateTask";
import { TasksDB } from "../../../data/tasksDataBase";
import { JwtAuthorizer } from "../../lambda/services/jwtAuthorizer";

export const UpdateTaskEndpoint = async (req: Request, res: Response) => {
    try{
        const updateTaskUC = new UpdateTaskUC( new TasksDB(), new JwtAuthorizer());

        const auth = req.headers.authorization || req.headers.Authorization;

        const result = await updateTaskUC.execute({
            id: req.params.id,
            token: auth as string,
            text: req.body.text
        });

        res.status(200).send(result);
    } catch(err){
        res.status(400).send({
            message: err.message
        });
    };
};