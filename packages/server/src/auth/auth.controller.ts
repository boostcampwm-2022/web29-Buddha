import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  HttpCode,
  Query,
  Req,
} from '@nestjs/common';
import { SignUpDto } from '../auth/dto/signup.dto';
import { NaverSignInDto } from '../auth/dto/naver-singIn.dto';

import { Request } from 'express';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

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
