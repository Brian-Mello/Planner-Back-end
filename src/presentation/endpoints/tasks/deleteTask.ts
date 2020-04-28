import { Request, Response } from "express";
import { DeleteTaskUC } from "../../../business/usecase/tasks/deleteTask";
import { TasksDB } from "../../../data/tasksDataBase";
import { JwtAuthorizer } from "../../lambda/services/jwtAuthorizer";

export const DeleteTaskEndpoint = async (req: Request, res: Response) => {
    try{
        const deleteTaskUC = new DeleteTaskUC( new TasksDB(), new JwtAuthorizer);

        const auth = req.headers.authorization || req.headers.Authorization;

        const result = await deleteTaskUC.execute({
            id: req.params.id,
            token: auth as string
        });

        res.status(200).send(result);
    } catch(err){
        res.status(400).send({
            message: err.message
        });
    };
};