import { TasksGateway } from "../../gateways/tasksGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { UserNotFound } from "../../error/userNotFound";
import { InvalidParameterError } from "../../error/InvalidParams";

export class ChangeTasksCompletedStateUC{
    constructor(
        private tasksGateway: TasksGateway,
        private authenticationGateway: AuthenticationGateway
    ){}

    public async execute(input: ChangeTasksCompletedStateUCInput): Promise<ChangeTasksCompletedStateUCOutput>{
        const userInfo = await this.authenticationGateway.getUsersInfoFromToken(input.token);

        if(!userInfo){
            throw new UserNotFound();
        };

        let completedTasks = "FALSE"

        if(input.completed === "FALSE"){
            completedTasks = "TRUE"
        } else if (input.completed === "TRUE"){
            completedTasks = "FALSE"
        } else if (input.completed !== "FALSE"){
            throw new InvalidParameterError()
        }

        await this.tasksGateway.updateAllTasksToCompleted(userInfo.id, input.completed, completedTasks)

        return{
            message: "Tasks are Updated"
        }
    }
}

export interface ChangeTasksCompletedStateUCInput{
    token: string;
    completed: string;
}

export interface ChangeTasksCompletedStateUCOutput{
    message: string;
}