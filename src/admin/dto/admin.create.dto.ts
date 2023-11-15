import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  isNotEmpty,
} from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @Length(6, 20)
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase character',
  })
  //   string must contain at least one uppercase character
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase character',
  })
  //   string must contain at least one number
  @Matches(/[0-9]/, { message: 'Password must contain at least one number' })
  //   string must contain at least one special character
  @Matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
    message: 'Password must contain at least one special character',
  })
  password: string;

  @IsOptional()
  phone: string;
}

export class verifyAdminDTO {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}

export class verifyResetpasswordDTO {
  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase character',
  })
  //   string must contain at least one uppercase character
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase character',
  })
  //   string must contain at least one number
  @Matches(/[0-9]/, { message: 'Password must contain at least one number' })
  //   string must contain at least one special character
  @Matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
    message: 'Password must contain at least one special character',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase character',
  })
  //   string must contain at least one uppercase character
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase character',
  })
  //   string must contain at least one number
  @Matches(/[0-9]/, { message: 'Password must contain at least one number' })
  //   string must contain at least one special character
  @Matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
    message: 'Password must contain at least one special character',
  })
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}

export class resendTokenDTO {
  @IsEmail()
  email: string;
}

export class adminLoginDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty({
    message: 'Password is required',
  })
  password: string;
}

export class resetPasswordDTO {
  @IsEmail()
  email: string;
}
