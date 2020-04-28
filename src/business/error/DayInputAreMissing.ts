import { BaseError } from "./BaseError";

export class DayInputAreMissing extends BaseError {
  constructor() {
    super(400, "Day input are missing!");
  }
}