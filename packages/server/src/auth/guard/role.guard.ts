import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USER_ROLE } from 'src/user/enum/userRole.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { user } = req;

    if (!user) {
      throw new BadRequestException(
        '요청에 유저를 식별할 수 있는 정보가 없습니다.'
      );
    }

    const allowedRoles = this.reflector.getAllAndOverride<USER_ROLE[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    return allowedRoles.some((role) => user.userRole === role);
  }
}
