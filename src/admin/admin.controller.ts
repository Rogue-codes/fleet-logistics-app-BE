import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateAdminDto,
  adminLoginDTO,
  resendTokenDTO,
  resetPasswordDTO,
  verifyAdminDTO,
  verifyResetpasswordDTO,
} from './dto/admin.create.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/register')
  create(@Body() params: CreateAdminDto) {
    return this.adminService.create(params);
  }

  @Post('/verify')
  verifyMail(@Body() params: verifyAdminDTO) {
    return this.adminService.verifyMail(params);
  }

  @Post('/resend-token')
  resendVerificationCode(@Body() params: resendTokenDTO) {
    return this.adminService.resendToken(params);
  }

  @Post('/reset-password')
  resetPassword(@Body() params: resetPasswordDTO) {
    return this.adminService.passwordReset(params);
  }

  @Post('/validate-password-reset')
  validateResetPassword(@Body() params: verifyResetpasswordDTO) {
    return this.adminService.confirmPasswordReset(params);
  }

  @Post('/login')
  login(@Body() params: adminLoginDTO) {
    return this.adminService.login(params);
  }
}
