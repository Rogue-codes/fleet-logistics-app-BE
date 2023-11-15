import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { adminProvider } from './admin.provider';
import { MailServiceService } from 'src/mail-service/mail-service.service';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '3d',
      },
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService, MailServiceService, ...adminProvider],
})
export class AdminModule {}
