import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  signup(signUpDto: SignUpDto) {
    return 'This action adds a new user';
  }

  signout(jwt: string) {
    return 'This action signs out a user';
  }

  update(updateUserDto: UpdateUserDto) {
    return `This action updates a user`;
  }

  remove(jwt: string) {
    return `This action removes a user`;
  }

  checkUser(jwt: string) {}
}
