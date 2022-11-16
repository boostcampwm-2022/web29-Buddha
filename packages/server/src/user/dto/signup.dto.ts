import { USER_TYPE } from '../enum/userType.enum';

export class SignUpDto {
  readonly userType: USER_TYPE;
  readonly nickname: string;
  readonly corporate: string;
}
