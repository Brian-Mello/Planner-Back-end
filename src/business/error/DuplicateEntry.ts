import { BaseError } from "./BaseError";

export class DuplicateEntryError extends BaseError {
  constructor() {
    super(401, "Duplicate Entry");
  }
}