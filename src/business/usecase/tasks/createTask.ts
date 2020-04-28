import { TaskDay, Task } from "../../entites/tasks";
import { TasksGateway } from "../../gateways/tasksGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { v4 } from 'uuid';
import { UserNotFound } from '../../error/userNotFound'
import { InvalidParameterError } from "../../error/InvalidParams";
import { TextInputAreMissing } from "../../error/TextInputAreMissing";
import { CompletedInputAreMissing } from "../../error/CompletedInputAreMissing";
import { DayInputAreMissing } from "../../error/DayInputAreMissing";

export class CreateTaskUC{
    constructor(
        private tasksGateway: TasksGateway,
        private authenticationGateway: AuthenticationGateway
    ){};

    public async execute(input: CreateTaskUCInput): Promise<CreateTaskUCOutput>{
        const id = v4();

        const userInfo = this.authenticationGateway.getUsersInfoFromToken(input.token)

        if(!userInfo){
            throw new UserNotFound();
        };

        if(!input.text){
            throw new TextInputAreMissing();
        };

        if(!input.day){
            throw new DayInputAreMissing();
        };

        let day = TaskDay.SEGUNDA;

        if(input.day === "Terça"){
            day = TaskDay.TERCA;
        } else if (input.day === "Quarta"){
            day = TaskDay.QUARTA;
        } else if(input.day === "Quinta"){
            day = TaskDay.QUINTA;
        } else if(input.day === "Sexta"){
            day = TaskDay.SEXTA;
        } else if(input.day === "Sábado"){
            day = TaskDay.SABADO;
        } else if (input.day === "Domingo"){
            day = TaskDay.DOMINGO;
        } else if(input.day !== "Segunda"){
            throw new InvalidParameterError();
        };

        let completed = false

        const newTask = new Task (
            id,
            input.text,
            day,
            completed,
            userInfo.id
        );

        await this.tasksGateway.createTask(newTask);


        return{
            message: "Task created successfully!"
        };
    };
};

export interface CreateTaskUCInput{
    text: string;
    day: TaskDay;
    token: string;
};

export interface CreateTaskUCOutput{
    message: string;
};