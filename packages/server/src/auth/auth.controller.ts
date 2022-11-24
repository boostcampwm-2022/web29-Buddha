import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { SignUpDto } from '../auth/dto/signup.dto';
import { NaverSignInDto } from '../auth/dto/naver-singIn.dto';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 네이버 로그인
  @Get('/naver-oauth')
  async naverSignIn(
    @Req() req: Request,
    @Query() naverSignInDto: NaverSignInDto,
    @Res() res: Response
  ) {
    const { accessToken } = await this.authService.naverSignIn(
      req,
      naverSignInDto
    );

    res.cookie('accessToken', accessToken, {
      domain: '118.67.143.106',
      path: '/',
      httpOnly: true,
    });

    return res.status(200).end();
  }

  // 회원가입
  @Post('/signup')
  @HttpCode(201)
  async signUp(@Req() req: Request, @Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(req, signUpDto);
  }

  // 유저 권한 확인
  @Get()
  async checkUser() {
    const jwt = 'jwt';
    return jwt;
  }
}
