import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { AdminModel } from 'src/admin/model/admin.model';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(private readonly adminService: AdminService) {}
  async use(req: any, res: any, next: () => void) {
    const auth = req.headers.authorization;
    const token = auth == undefined ? '' : auth.replace(/Bearer /, '');
    const admin: AdminModel | boolean = token
      ? await this.adminService.getUserFromToken(token)
      : false;
    if (!admin) {
      throw new UnauthorizedException(
        'Not authenticated; login to perform this operation.',
      );
    }
    req.admin = admin;
    next();
  }
}
