import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StaffModel } from './model/staff.model';
import { createStaffDTO } from './dto/admin.actions.dto';

@Injectable()
export class AdminActionsService {
  constructor(
    @Inject('STAFF_REPOSITORY')
    private readonly staffModel: typeof StaffModel,
  ) {}

  async addStaff(staff: createStaffDTO): Promise<any> {
    // check if staff already exists using email

    if (staff.role === 'MEMBER' && !staff.managerId) {
      throw new HttpException('staff managerId is required ', 400);
    }
    // if a managerID is provided, confirm if it is a valid ID for a manager
    if (staff.role === 'MEMBER' && staff.managerId) {
      const validManagerId = await this.staffModel.findOne({
        where: {
          id: staff.managerId,
        },
      });
      if (!validManagerId) {
        throw new NotFoundException('manager not found ');
      }
    }
    const alreadyExistingStaff = await this.staffModel.findOne({
      where: {
        email: staff.email,
      },
    });
    // if they do, throw an error
    if (alreadyExistingStaff) {
      throw new HttpException('staff with this email already exist', 400);
    }

    const defaultPassword = 'Simple@123';

    // if they don't, register them

    const newStaff = await this.staffModel.create({
      firstName: staff.firstName,
      lastName: staff.lastName,
      email: staff.email,
      password: defaultPassword,
      phone: staff.phone,
      managerId: staff.managerId,
      role: staff.role,
    });

    return {
      success: true,
      message: 'Staff created successfully',
      data: {
        id: newStaff.id,
        fistName: newStaff.firstName,
        lastName: newStaff.lastName,
        email: newStaff.email,
        img: newStaff.image_url,
        isActive: newStaff.isActive,
        phone: newStaff.phone,
        managerId: newStaff.managerId,
        role: newStaff.role,
      },
    };
  }
}
