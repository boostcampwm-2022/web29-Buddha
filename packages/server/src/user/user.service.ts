import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { SignUpDto } from './dto/signUp.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Request } from 'express';

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

  async manageOAuth(req: Request, email: string, name: string) {
    const user: User | null = await this.userRepository.findOneBy({ email });
    if (user) {
      return 'jwt';
    } else {
      this._setSession(req, email, name);
      throw new HttpException('no user data found', HttpStatus.SEE_OTHER);
    }
  }

  _setSession(req: Request, email: string, name: string) {
    const session: any = req.session;
    session.name = name;
    session.email = email;
  }
}
