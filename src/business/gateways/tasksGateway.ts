import { Task } from "../entites/tasks";

export interface TasksGateway {
    createTask(task: Task): Promise<void>;
    getTasks(ip: string): Promise<Task[] | undefined>;
    updateTask(id: string, user_id: string, text: string): Promise<void>;
    deleteTask(id: string, user_id: string): Promise<void>; 
    getTask(id: string): Promise<Task | undefined>;
    updateCompletedState(id: string, user_id: string, completed: string): Promise<void>;
    updateAllTasksToCompleted(user_id: string, completed: string, changeCompleted: string): Promise<void>;
}