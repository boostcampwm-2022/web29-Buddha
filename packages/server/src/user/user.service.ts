import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
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
