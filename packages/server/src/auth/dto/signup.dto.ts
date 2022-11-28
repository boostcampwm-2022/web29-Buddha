import { USER_ROLE } from '../../user/enum/userRole.enum';

export class SignUpDto {
  readonly userType: USER_ROLE;
  readonly nickname: string;
  readonly corporate: string;
}
