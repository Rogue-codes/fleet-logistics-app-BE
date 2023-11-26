import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Role } from 'src/admin-actions/dto/admin.actions.dto';

@ValidatorConstraint({ name: 'IsValidRole', async: false })
export class IsValidRole implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return Object.values(Role).includes(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a valid role`;
  }
}
