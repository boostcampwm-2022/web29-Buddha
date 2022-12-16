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

  async create(user: User): Promise<User> {
    const userObjInserted = await this.userRepository.save(user);
    return userObjInserted;
  }

  async findById(id: number): Promise<User> {
    const user: User = await this.userRepository.findOneBy({ id });
    return user;
  }

  async findOneByName(name: string) {
    const user: User | null = await this.userRepository.findOneBy({ name });
    return user;
  }
}
