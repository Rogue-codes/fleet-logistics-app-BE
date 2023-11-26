import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './admin/admin.module';
import { MailServiceModule } from './mail-service/mail-service.module';
import { AdminMiddleware } from './middlewares/admin.middleware';
import { AdminService } from './admin/admin.service';
import { adminProvider } from './admin/admin.provider';
import { MailServiceService } from './mail-service/mail-service.service';
import { JwtService } from '@nestjs/jwt';
import { AdminActionsModule } from './admin-actions/admin.actions.module';

@Module({
  imports: [DatabaseModule, AdminModule, MailServiceModule, AdminActionsModule],
  controllers: [],
  providers: [AdminService, MailServiceService, JwtService, ...adminProvider],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply the AuthMiddleware globally
    consumer.apply(AdminMiddleware).forRoutes('/admin-actions');
  }
}
