import { BaseDB } from "./baseDatabase";
import { TasksGateway } from '../business/gateways/tasksGateway';
import { Task } from "../business/entites/tasks";

export class TasksDB extends BaseDB implements TasksGateway{
    private tasksTableName = 'tasks';
    private usersTableName = 'users';

    private mapTaskToDB(input?: any): Task | undefined{
        return(
            input &&
            new Task(
                input.id,
                input.text,
                input.day,
                input.completed,
                input.user_id
            )
        )
    }

    public async createTask(task: Task): Promise<void>{
        await this.connection.raw(`
            INSERT INTO ${this.tasksTableName} (id, text, day, user_id)
            VALUES(
                '${task.getId()}',
                '${task.getText()}',
                '${task.getDay()}',

                '${task.getUser_id()}'
            )
        `)
    }

    public async getTasks(id: string): Promise<Task[] | undefined>{
        const tasks = await this.connection.raw(`
            SELECT *
            FROM ${this.usersTableName} u
            JOIN ${this.tasksTableName} t
            ON t.user_id = u.id
            WHERE t.user_id='${id}'
        `)

        if(!tasks[0][0]){
            return undefined;
        };

        return await tasks[0].map((task: any) => {
            return new Task(
                task.id,
                task.text,
                task.day,
                task.completed,
                task.user_id,
            );
        });
    }

    public async getTask(id: string): Promise<Task | undefined> {
        const result = await this.connection.raw(`
            SELECT *
            FROM ${this.tasksTableName}
            WHERE id='${id}'
        `)

        if(!result[0][0]){
            return undefined;
        }

        return await this.mapTaskToDB(result[0][0])
    }

    public async updateTask(id: string, user_id: string, text: string): Promise<void>{
        await this.connection.raw(`
            UPDATE ${this.tasksTableName}
            SET text = '${text}'
            WHERE id='${id}' AND user_id='${user_id}'
        `)
    }

    public async updateCompletedState(id: string, user_id: string, completed: string): Promise<void>{
        await this.connection.raw(`
            UPDATE ${this.tasksTableName}
            SET completed = ${completed}
            WHERE id='${id}' AND user_id='${user_id}'
        `)
    }

    public async updateAllTasksToCompleted(user_id: string, completed: string, changeCompleted: string): Promise<void>{
        await this.connection.raw(`
            UPDATE ${this.tasksTableName}
            SET completed = ${completed}
            WHERE user_id='${user_id}' AND completed=${changeCompleted}
        `)
    }

    public async deleteTask(id: string, user_id: string): Promise<void>{
        await this.connection.raw(`
            DELETE FROM ${this.tasksTableName}
            WHERE id='${id}' AND user_id='${user_id}'
        `)
    }
}