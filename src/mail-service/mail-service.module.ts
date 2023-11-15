import { Module } from '@nestjs/common';
import { MailServiceService } from './mail-service.service';

@Module({
  imports: [],
  providers: [MailServiceService],
  controllers: [],
})
export class MailServiceModule {}
