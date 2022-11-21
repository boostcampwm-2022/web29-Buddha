import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { USER_TYPE } from 'src/user/enum/userType.enum';
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
    const { email, name } = await this._getUserInfoFromNaver(code, state);

    const user: User | null = await this.userService.findOneByEmail(email);

    if (user) {
      const userType: USER_TYPE = user.role;
      const tokens = this._setJwt(user.id, userType);
      return tokens;
    } else {
      this._setSession(req, email, name);
      throw new HttpException('no user data found', HttpStatus.SEE_OTHER);
    }
  }

  async signUp(req: Request, signUpDto: SignUpDto) {
    const userInfoFromSession = this._getUserInfoFromSession(req);
    const { userType } = signUpDto;

    let user;
    if (userType == USER_TYPE.CLIENT) {
      user = User.createClient({ ...userInfoFromSession, ...signUpDto });
    } else {
      user = User.createManager({ ...userInfoFromSession, ...signUpDto });
    }

    await this.userService.create(user);

    const tokens = this._setJwt(user.id, userType);
    return tokens;
  }

  private async _getUserInfoFromNaver(code: string, state: string) {
    const { access_token } = await this.naverOAuthService.getTokens(
      code,
      state
    );
    return await this.naverOAuthService.getUserInfo(access_token);
  }

  private _setSession(req: Request, email: string, name: string) {
    const session: any = req.session;
    session.name = name;
    session.email = email;
  }

  private _getUserInfoFromSession(req: Request) {
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

  private _setJwt(id: number, userType: USER_TYPE) {
    const payload: JwtPayload = { id, userType };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
