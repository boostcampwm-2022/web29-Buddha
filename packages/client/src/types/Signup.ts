export interface SignupRequestBody {
  userType: 'CLIENT' | 'MANAGER';
  nickname: string;
  corporate?: string;
}
