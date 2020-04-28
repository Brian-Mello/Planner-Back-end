import { TasksGateway } from "../../gateways/tasksGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { UserNotFound } from "../../error/userNotFound";

export class DeleteTaskUC{
    constructor(
        private tasksGateway: TasksGateway,
        private authenticationGateway: AuthenticationGateway
    ){};

    public async execute(input: DeleteTaskUCInput): Promise<DeleteTaskUCOutput>{
        const userInfo = await this.authenticationGateway.getUsersInfoFromToken(input.token);

        if(!userInfo){
            throw new UserNotFound();
        };

        await this.tasksGateway.deleteTask(input.id, userInfo.id);

        return{
            message: "Task deleted successfully!"
        };
    };
};

export interface DeleteTaskUCInput{ 
    id: string;
    token: string;
};

export interface DeleteTaskUCOutput{
    message: string;
};