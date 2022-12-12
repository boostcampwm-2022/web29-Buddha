import { JwtGuard } from './../auth/guard/jwt.guard';
import { Controller, Body, Patch, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/interfaces/jwtPayload';
import { User } from './entities/user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원정보(닉네임) 수정
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return;
  }

  @Get()
  @UseGuards(JwtGuard)
  async findOne(@Req() req: Request): Promise<User> {
    const { id } = req.user as JwtPayload;
    return await this.userService.findById(id);
  }
}
