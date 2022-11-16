import { USER_TYPE } from 'src/user/enum/userType.enum';

export interface JwtPayload {
  id: number;
  userType: USER_TYPE;
}
