import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/signUp.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원가입
  @Post()
  @HttpCode(201)
  signUp(@Body() signUpDto: SignUpDto) {
    return this.userService.signup(signUpDto);
  }

  // 로그아웃
  @Post()
  signOut() {
    const jwt = 'jwt';
    return this.userService.signout(jwt);
  }

  // 회원정보(닉네임) 수정
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  // 회원 탈퇴
  @Delete()
  remove() {
    const jwt = 'jwt';
    return this.userService.remove(jwt);
  }

  // 유저 권한 확인
  @Get()
  checkUser() {
    const jwt = 'jwt';
    return this.userService.checkUser(jwt);
  }
}
