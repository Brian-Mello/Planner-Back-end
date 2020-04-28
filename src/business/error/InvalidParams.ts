import { BaseError } from "./BaseError";

export class InvalidParameterError extends BaseError {
  constructor() {
    super(401, "Invalid parameter");
  }
}
