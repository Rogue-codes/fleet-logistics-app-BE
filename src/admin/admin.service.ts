import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminModel } from './model/admin.model';
import {
  CreateAdminDto,
  adminLoginDTO,
  resendTokenDTO,
  resetPasswordDTO,
  verifyAdminDTO,
  verifyResetpasswordDTO,
} from './dto/admin.create.dto';
import * as bcrypt from 'bcrypt';
import { MailServiceService } from 'src/mail-service/mail-service.service';
import { JwtService } from '@nestjs/jwt';
import {
  IPasswordReset,
  VerifiedAdminRespDto,
} from './interface/VerifiedAdminRespInterface';
import { PasswordReset } from './model/passwordreset.model';

@Injectable()
export class AdminService {
  constructor(
    @Inject('ADMIN_REPOSITORY')
    private readonly admin: typeof AdminModel,
    @Inject('RESET_PASSWORD_REPOSITORY')
    private readonly resetPasword: typeof PasswordReset,
    private readonly mailService: MailServiceService,
    private jwtService: JwtService,
  ) {}

  async create(params: CreateAdminDto): Promise<AdminModel> {
    // check if admin with email already exists
    const alreadyExistingAdmin = await this.admin.findOne({
      where: {
        email: params.email,
      },
    });

    if (alreadyExistingAdmin) {
      throw new HttpException('email already exists', 400);
    }

    const token: string = (
      Math.floor(Math.random() * 900000) + 100000
    ).toString();

    const _admin = await this.admin.create({
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      phone: params.phone,
      password: bcrypt.hashSync(params.password, 10),
      verification_code: bcrypt.hashSync(token, 10),
      verification_code_expires: new Date(Date.now() + 1000 * 60 * 25),
    });

    // send verification mail
    await this.mailService.sendVerificationMail(_admin, token);
    return _admin;
  }

  async verifyMail(
    Params: verifyAdminDTO,
  ): Promise<VerifiedAdminRespDto | string> {
    // get the user
    const admin = await this.admin.findOne({
      where: {
        email: Params.email,
      },
    });

    if (!admin) {
      throw new NotFoundException('no admin with this email exists');
    }

    if (admin.email_verified_at !== null) {
      return 'admin already verified';
    }

    // check if token hasn't expired
    const isExpired =
      new Date(admin.verification_code_expires).getTime() < Date.now();

    if (isExpired) {
      throw new HttpException('Verification token has expired', 400);
    }

    // compare token in the DB with token in req.body
    const validToken = bcrypt.compareSync(
      Params.token,
      admin.verification_code,
    );
    if (!validToken) {
      throw new HttpException('Token is not valid', 400);
    }

    // Update the 'is_verified' field in the database
    await this.admin.update(
      { email_verified_at: Date.now() },
      {
        where: {
          email: admin.email,
        },
      },
    );

    const access_token = this.jwtService.sign({ id: admin.id });

    // send account verified mail
    await this.mailService.sendEmailVerifiedMail(admin);

    return {
      success: true,
      message: 'Account successfully Verified',
      data: {
        id: admin.id,
        FirstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
      },
      access_token,
    };
  }

  async resendToken(Params: resendTokenDTO): Promise<string> {
    const verification_code = Math.floor(
      Math.random() * 900000 + 100000,
    ).toString();

    // get the user
    const admin = await this.admin.findOne({
      where: {
        email: Params.email,
      },
    });

    if (!admin) {
      throw new HttpException('no admin with this email found', 400);
    }

    if (admin.email_verified_at !== null) {
      throw new HttpException(
        {
          success: false,
          message: 'admin already verified',
        },
        400,
      );
    }

    await admin.update(
      {
        verification_code: bcrypt.hashSync(verification_code, 10),
        verification_code_expires: new Date(Date.now() + 1000 * 60 * 25),
      },
      {
        where: {
          email: admin.email,
        },
      },
    );

    await this.mailService.sendVerificationMail(admin, verification_code);
    return `A verification has been sent to ${admin.email}`;
  }

  async login(user: adminLoginDTO): Promise<VerifiedAdminRespDto> {
    // get user
    const registeredUser = await this.admin.findOne({
      where: {
        email: user.email,
      },
    });

    if (!registeredUser) {
      throw new HttpException('Invalid credentails', 401);
    }

    if (!registeredUser.email_verified_at) {
      throw new HttpException('email not verified', 403);
    }

    // validate password
    const validPassword = bcrypt.compareSync(
      user.password,
      registeredUser.password,
    );
    if (!validPassword) {
      throw new HttpException('Invalid credentails', 401);
    }

    const token = this.jwtService.sign({
      id: registeredUser.id,
      email: registeredUser.email,
    });

    return {
      success: true,
      message: 'admin login successful',
      data: {
        id: registeredUser.id,
        FirstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        email: registeredUser.email,
      },
      access_token: token,
    };
  }

  async passwordReset({
    email,
  }: resetPasswordDTO): Promise<VerifiedAdminRespDto> {
    // get the user using the email
    try {
      const admin = await this.admin.findOne({
        where: {
          email: email,
        },
      });
      if (!admin) {
        throw new NotFoundException('No admin with this email found');
      }

      // generate a random token
      const token = Math.floor(Math.random() * 900000 + 100000).toString();

      await this.resetPasword.create({
        admin_id: admin.id,
        token: token,
        expires: new Date(Date.now() + 1000 * 60 * 25),
      });

      await this.mailService.sendResetPasswordMail(admin, token);

      return {
        success: true,
        message: `A password reset token has been sent to ${admin.email}`,
      };
    } catch (error) {
      throw error;
    }
  }

  async confirmPasswordReset(
    paramms: verifyResetpasswordDTO,
  ): Promise<IPasswordReset> {
    // get the admin
    const resetToken = await this.resetPasword.findOne({
      where: {
        token: paramms.token,
      },
    });

    if (!resetToken) {
      throw new UnauthorizedException('Token not Valid');
    }

    // check if token has expired
    const isExpired = new Date(resetToken.expires).getTime() < Date.now();
    if (isExpired) {
      throw new UnauthorizedException('token has expired');
    }

    // compare password with confirmPassword
    const passwordMatches = paramms.password === paramms.confirmPassword;

    if (!passwordMatches) {
      throw new HttpException(
        'password and confirm password do not match',
        400,
      );
    }

    // check if token matches
    const isValidToken = paramms.token === resetToken.token;

    if (isValidToken) {
      await this.admin.update(
        {
          password: bcrypt.hashSync(paramms.password, 10),
        },
        {
          where: {
            id: resetToken.admin_id,
          },
        },
      );

      // delete the token
      await this.resetPasword.destroy({
        where: {
          id: resetToken.id,
        },
      });

      const admin = await this.admin.findOne({
        where: {
          id: resetToken.admin_id,
        },
      });

      // send mail that password has been reset
      this.mailService.sendResetPasswordSuccessfulMail(admin);

      return {
        success: true,
        message: 'Password reset successsful',
      };
    } else {
      return {
        success: false,
        message: 'Token is invalid',
      };
    }
  }
}
