import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
  constructor() {
    super(404, "Not found!");
  }
}