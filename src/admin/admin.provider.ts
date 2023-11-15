import { AdminModel } from './model/admin.model';
import { PasswordReset } from './model/passwordreset.model';

export const adminProvider = [
  {
    provide: 'ADMIN_REPOSITORY',
    useValue: AdminModel,
  },
  {
    provide: 'RESET_PASSWORD_REPOSITORY',
    useValue: PasswordReset,
  },
];
