import { BaseError } from "./BaseError";

export class UserNotFound extends BaseError {
  constructor() {
    super(400, "User not found!");
  }
}