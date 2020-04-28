import { BaseError } from "./BaseError";

export class ExistingUser extends BaseError {
  constructor() {
    super(405, "Existing user");
  }
}
