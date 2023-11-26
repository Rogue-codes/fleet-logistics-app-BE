import { Body, Controller, Post } from '@nestjs/common';
import { createStaffDTO } from './dto/admin.actions.dto';
import { AdminActionsService } from './admin.actions.service';

@Controller('admin-actions')
export class AdminActionsController {
  constructor(private readonly adminActions: AdminActionsService) {}

  @Post('/add')
  async addUser(@Body() staff: createStaffDTO): Promise<any> {
    return this.adminActions.addStaff(staff);
  }
}
