import { TasksGateway } from "../../gateways/tasksGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { UserNotFound } from "../../error/userNotFound";
import { InvalidParameterError } from "../../error/InvalidParams";

export class ChangeTaskCompletedStateUC{
    constructor(
        private tasksGateway: TasksGateway,
        private authenticationGateway: AuthenticationGateway
    ){}

    public async execute(input: ChangeTaskCompletedStateUCInput): Promise<ChangeTaskCompletedStateUCOutput>{
        const userInfo = await this.authenticationGateway.getUsersInfoFromToken(input.token);

        if(!userInfo){
            throw new UserNotFound();
        };

        if(input.completed === "FALSE"){
            input.completed = "FALSE"
        } else if (input.completed === "TRUE"){
            input.completed = "TRUE"
        } else if (input.completed !== "FALSE"){
            throw new InvalidParameterError()
        }

        await this.tasksGateway.updateCompletedState(input.id, userInfo.id, input.completed)

        return{
            message: "Task are Updated"
        }
    }
}

export interface ChangeTaskCompletedStateUCInput{
    token: string;
    id: string;
    completed: string;
}

export interface ChangeTaskCompletedStateUCOutput{
    message: string;
}