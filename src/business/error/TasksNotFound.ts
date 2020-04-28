import { BaseError } from "./BaseError";

export class TasksNotFound extends BaseError {
  constructor() {
    super(400, "Tasks not found!");
  }
}