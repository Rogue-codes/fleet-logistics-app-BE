import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsValidRole } from 'src/validators/role.validator';

export class createStaffDTO {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  managerId: number;

  @IsNotEmpty()
  @IsString()
  @Validate(IsValidRole) // Use the custom validator here
  role: Role;
}

export enum Role {
  MANAGER = 'MANAGER',
  MEMBER = 'MEMBER',
  LOGISTICS_MANAGER = 'LOGISTICS_MANAGER',
}
