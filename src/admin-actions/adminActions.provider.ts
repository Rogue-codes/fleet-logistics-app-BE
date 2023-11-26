import { StaffModel } from './model/staff.model';

export const adminActionProvider = [
  {
    provide: 'STAFF_REPOSITORY',
    useValue: StaffModel,
  },
];
