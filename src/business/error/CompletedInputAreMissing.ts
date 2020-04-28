import { BaseError } from "./BaseError";

export class CompletedInputAreMissing extends BaseError {
  constructor() {
    super(400, "Completed input are missing!");
  }
}