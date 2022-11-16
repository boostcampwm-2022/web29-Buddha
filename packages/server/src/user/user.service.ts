import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { SignUpDto } from './dto/signUp.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}
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

  checkUser(jwt: string) {
    return;
  }

  async manageOAuth(email: string, name: string) {
    const user: User | null = await this.userRepository.findOneBy({ email });
    console.log(user);
    if (user) {
      return 'jwt';
    } else {
      return 'session';
    }
  }
}
