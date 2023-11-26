import { Module } from '@nestjs/common';
import { AdminActionsService } from './admin.actions.service';
import { adminActionProvider } from './adminActions.provider';
import { AdminActionsController } from './admin.actions.controller';

@Module({
  imports: [],
  controllers: [AdminActionsController],
  providers: [AdminActionsService, ...adminActionProvider],
})
export class AdminActionsModule {}
