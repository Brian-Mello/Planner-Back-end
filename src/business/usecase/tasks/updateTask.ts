import { TasksGateway } from "../../gateways/tasksGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { UserNotFound } from "../../error/userNotFound";

export class UpdateTaskUC{
    constructor(
        private tasksGateway: TasksGateway,
        private autheticationGateway: AuthenticationGateway
    ){}

    public async execute(input: UpdateTaskUCInput): Promise<UpdateTaskUCOutput>{
        const userInfo = await this.autheticationGateway.getUsersInfoFromToken(input.token);

        if(!userInfo){
            throw new UserNotFound();
        };

        await this.tasksGateway.updateTask(input.id, userInfo.id, input.text);

        return{
            message: "Task updated successfully!"
        };
    };
};

export interface UpdateTaskUCInput{
    token: string;
    id: string;
    text: string;
};

export interface UpdateTaskUCOutput{
    message: string;
};