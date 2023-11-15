import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './admin/admin.module';
import { MailServiceModule } from './mail-service/mail-service.module';

@Module({
  imports: [DatabaseModule, AdminModule, MailServiceModule],
  controllers: [],
})
export class AppModule {}
