import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { NaverSignInDto } from './dto/naver-singIn.dto';
import { USER_TYPE } from './enum/userType.enum';

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async naverSignIn(req: Request, naverSignInDto: NaverSignInDto) {
    const { code, state } = naverSignInDto;
    const { email, name } = await this.authService.getUserInfoFromNaver(
      code,
      state
    );

    const user: User | null = await this.userRepository.findOneBy({ email });

    if (user) {
      const userType: USER_TYPE = user.role;
      const tokens = this.authService.setJwt(user.id, userType);
      return tokens;
    } else {
      this.authService.setSession(req, email, name);
      throw new HttpException('no user data found', HttpStatus.SEE_OTHER);
    }
  }

  async signUp(req: Request, signUpDto: SignUpDto) {
    const userInfoFromSession = this.authService.getUserInfoFromSession(req);
    const { userType } = signUpDto;

    let user;
    if (userType == USER_TYPE.CLIENT) {
      user = User.createClient({ ...userInfoFromSession, ...signUpDto });
    } else {
      user = User.createManager({ ...userInfoFromSession, ...signUpDto });
    }

    await this.userRepository.save(user);

    const tokens = this.authService.setJwt(user.id, userType);
    return tokens;
  }

  signOut(jwt: string) {
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
}
