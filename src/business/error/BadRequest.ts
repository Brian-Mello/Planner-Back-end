import { BaseError } from "./BaseError";

export class BadRequest extends BaseError {
  constructor() {
    super(400, "Bad Request");
  }
}