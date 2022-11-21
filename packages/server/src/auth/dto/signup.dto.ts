import { USER_TYPE } from '../../user/enum/userType.enum';

export class SignUpDto {
  readonly userType: USER_TYPE;
  readonly nickname: string;
  readonly corporate: string;
}
