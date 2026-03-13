import { ValidateIf, ValidationOptions } from 'class-validator';

export function IsNullable(validationOptions?: ValidationOptions) {
  return ValidateIf((_, value) => value !== null, validationOptions);
}