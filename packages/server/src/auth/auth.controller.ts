import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/naver-oauth')
  async naverOAuthSignIn(@Req() req: Request, res) {
    const code = req.query.code;
    const state = req.query.state;

    const result = await this.authService.naverOAuthSignIn(code, state);

    return result;
  }
}
