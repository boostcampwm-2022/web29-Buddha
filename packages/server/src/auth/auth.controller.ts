import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SignUpDto } from '../auth/dto/signup.dto';
import { NaverSignInDto } from '../auth/dto/naver-singIn.dto';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtGuard } from './guard/jwt.guard';
import { JwtPayload } from './interfaces/jwtPayload';

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

    // console.log(process.env.DOMAIN);
    res.cookie('accessToken', accessToken, {
      // domain: process.env.DOMAIN,
      // path: '/',
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
  @UseGuards(JwtGuard)
  async checkUserType(@Req() req: Request) {
    const { userType } = req.user as JwtPayload;
    return { userType };
  }
}
