import { TaskDay } from "../../entites/tasks";
import { TasksGateway } from "../../gateways/tasksGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { UserNotFound } from "../../error/userNotFound";
import { TasksNotFound } from "../../error/TasksNotFound";

export class GetTasksUC{
    constructor(
        private tasksGateway: TasksGateway,
        private authentitcationGateway: AuthenticationGateway
    ){};

    public async execute(input: GetTasksUCInput): Promise<GetTasksUCOutput>{
        const userInfo = await this.authentitcationGateway.getUsersInfoFromToken(input.token);

        if(!userInfo){
            throw new UserNotFound();
        };

        let tasks = await this.tasksGateway.getTasks(userInfo.id);

        if(!tasks) {
            tasks = []
        }

        return{
            tasks: tasks.map(task => {
                return {
                    id: task.getId(),
                    text: task.getText(),
                    day: task.getDay(),
                    completed: task.getCompleted(),
                    user_id: task.getUser_id()
                }
            })
        };
    };
};

export interface GetTasksUCInput{
    token: string;
};

export interface GetTasksUCOutput{
    tasks: GetTasksUCOutputTasks[]
};

export interface GetTasksUCOutputTasks{
    id: string;
    text: string;
    day: TaskDay;
    completed: boolean;
    user_id: string;
};