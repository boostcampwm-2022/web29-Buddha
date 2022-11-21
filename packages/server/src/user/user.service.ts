import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { SignUpDto } from '../auth/dto/signup.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { NaverSignInDto } from '../auth/dto/naver-singIn.dto';
import { USER_TYPE } from './enum/userType.enum';

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async findOneByEmail(email: string) {
    const user: User | null = await this.userRepository.findOneBy({ email });
    return user;
  }

  async create(user: User) {
    await this.userRepository.save(user);
  }
}
