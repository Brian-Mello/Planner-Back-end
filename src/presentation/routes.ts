import express, { Request, Response } from "express";
import cors from 'cors';
import { CreateTaskEndpoint } from "./endpoints/tasks/createTask";
import { GetTasksEndpoint } from "./endpoints/tasks/getTasks";
import { UpdateTaskEndpoint } from "./endpoints/tasks/updateTask";
import { DeleteTaskEndpoint } from "./endpoints/tasks/deleteTask";
import { ChangeTaskCompletedStateEndpoint } from "./endpoints/tasks/changeTaskCompletedState";
import { ChangeTasksCompletedStateEndpoint } from "./endpoints/tasks/changeTasksCompletedState";
import { CheckUsersEndpoint } from "./endpoints/users/checkUsers";

const app = express();

app.use(cors());
app.use(express.json()); // Linha mágica (middleware)

// user
app.post('/checkUser', CheckUsersEndpoint);

// tasks
app.post('/createTask', CreateTaskEndpoint);
app.get('/tasks', GetTasksEndpoint);
app.post('/tasks/updateTask/:id', UpdateTaskEndpoint);
app.delete('/tasks/deleteTask/:id', DeleteTaskEndpoint);
app.post('/tasks/changeTaskCompletedState/:id', ChangeTaskCompletedStateEndpoint)
app.post('/tasks/changeTasksCompletedState', ChangeTasksCompletedStateEndpoint)



export default app;
