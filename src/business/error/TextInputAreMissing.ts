import { BaseError } from "./BaseError";

export class TextInputAreMissing extends BaseError {
  constructor() {
    super(400, "Text input are missing!");
  }
}