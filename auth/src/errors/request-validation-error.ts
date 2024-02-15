import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequsetValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super('Error connecting to db');

    // Only because  we are extending a build in class 
    Object.setPrototypeOf(this, RequsetValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map(err => {
      if (err.type == 'field') {
        return { message: err.msg, field: err.path }
      }
      return { message: err.msg }
    })
  }
}
