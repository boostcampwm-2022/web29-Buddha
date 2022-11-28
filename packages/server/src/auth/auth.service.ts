import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { USER_ROLE } from 'src/user/enum/userRole.enum';
import { JwtPayload } from './interfaces/jwtPayload';
import { NaverSignInDto } from './dto/naver-singIn.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { NaverOAuthService } from './naverOAuth.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly naverOAuthService: NaverOAuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async naverSignIn(req: Request, naverSignInDto: NaverSignInDto) {
    const { code, state } = naverSignInDto;
    const { email, name } = await this.getUserInfoFromNaver(code, state);

    const user: User | null = await this.userService.findOneByEmail(email);

    if (user) {
      const userType: USER_ROLE = user.role;
      const tokens = this.setJwt(user.id, userType);
      return tokens;
    } else {
      this.setSession(req, email, name);
      throw new HttpException('no user data found', HttpStatus.SEE_OTHER);
    }
  }

  async signUp(req: Request, signUpDto: SignUpDto) {
    const userInfoFromSession = this.getUserInfoFromSession(req);
    const { userType } = signUpDto;

    let user;
    if (userType == USER_ROLE.CLIENT) {
      user = User.createClient({ ...userInfoFromSession, ...signUpDto });
    } else {
      user = User.createManager({ ...userInfoFromSession, ...signUpDto });
    }

    const userObjInserted = await this.userService.create(user);

    const tokens = this.setJwt(userObjInserted.id, userObjInserted.role);
    return tokens;
  }

  private async getUserInfoFromNaver(code: string, state: string) {
    const { access_token } = await this.naverOAuthService.getTokens(
      code,
      state
    );

    return await this.naverOAuthService.getUserInfo(access_token);
  }

  private setSession(req: Request, email: string, name: string) {
    const session: any = req.session;
    session.name = name;
    session.email = email;
  }

  private getUserInfoFromSession(req: Request) {
    const session: any = req.session;
    const { name, email } = session;
    if (name === undefined || email === undefined) {
      throw new HttpException(
        '세션이 만료되었습니다.',
        HttpStatus.UNAUTHORIZED
      );
    }
    return { name, email };
  }

  private setJwt(id: number, userType: USER_ROLE) {
    const payload: JwtPayload = { id, userType };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
