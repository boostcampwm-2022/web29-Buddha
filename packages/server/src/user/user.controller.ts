import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/signup.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NaverSignInDto } from './dto/naver-singIn.dto';
import { Request } from 'express';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 네이버 로그인
  @Get('/naver-oauth')
  async naverSignIn(
    @Req() req: Request,
    @Query() naverSignInDto: NaverSignInDto
  ) {
    return await this.userService.naverSignIn(req, naverSignInDto);
  }

  // 회원가입
  @Post('/signup')
  @HttpCode(201)
  async signUp(@Req() req: Request, @Body() signUpDto: SignUpDto) {
    return await this.userService.signUp(req, signUpDto);
  }

  // 로그아웃
  @Post('/signout')
  signOut() {
    const jwt = 'jwt';
    return this.userService.signOut(jwt);
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
  async checkUser() {
    const jwt = 'jwt';
    return jwt;
  }
}
