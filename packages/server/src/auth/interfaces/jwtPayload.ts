import { USER_ROLE } from 'src/user/enum/userRole.enum';

export interface JwtPayload {
  id: number;
  userType: USER_ROLE;
}
