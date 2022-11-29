import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { USER_ROLE } from 'src/user/enum/userRole.enum';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { NaverSignInDto } from './dto/naver-singIn.dto';
import { NaverOAuthService } from './naverOAuth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  const mockNaverOAuthService = {
    getTokens: jest.fn().mockResolvedValue({
      access_token: 1234,
      refresh_token: 5678,
      token_type: 'bearer',
      expires_in: 600000,
    }),
    getUserInfo: jest.fn().mockResolvedValue({
      id: '1',
      email: 'gon@naver.com',
      name: 'gon',
    }),
  };

  const mockUserService = {
    findOneByEmail: jest.fn(),
    create: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secretOrPrivateKey: 'SECRET',
          signOptions: { expiresIn: '1h', issuer: 'buddah.com' },
        }),
      ],
      providers: [
        AuthService,
        { provide: NaverOAuthService, useValue: mockNaverOAuthService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    jwtService = module.get<JwtService>(JwtService);
    authService = module.get<AuthService>(AuthService);
  });

  describe('naverSignIn()', () => {
    it('유저가 아직 가입하지 않았을 때', async () => {
      // given
      const req = { session: {} } as Request;
      const naverSignInDto: NaverSignInDto = { code: '1234', state: '1234' };

      // 유저가 가입하지 않았기 때문에 null 값을 리턴하도록 mocking
      mockUserService.findOneByEmail.mockResolvedValue(null);

      // when
      // then
      await expect(async () => {
        await authService.naverSignIn(req, naverSignInDto);
      }).rejects.toThrowError(
        new HttpException('no user data found', HttpStatus.SEE_OTHER)
      );
    });

    it('고객 - 로그인(이미 가입함)', async () => {
      // given
      const req = { session: {} } as Request;
      const naverSignInDto: NaverSignInDto = { code: '1234', state: '1234' };
      const user = User.createClient({
        name: 'gon',
        email: 'gon@naver.com',
        nickname: 'nickname',
        userType: USER_ROLE.CLIENT,
      });
      const userId = 1;
      user.id = userId;

      mockUserService.findOneByEmail.mockResolvedValueOnce(user);

      // when
      const token = await authService.naverSignIn(req, naverSignInDto);

      // then
      const payload = jwtService.decode(token.accessToken);

      expect(token).toHaveProperty('accessToken');
      expect(payload['id']).toBe(userId);
      expect(payload['userRole']).toBe(USER_ROLE.CLIENT);
    });
  });
  it('업주 - 로그인(이미 가입함)', async () => {
    // given
    const req = { session: {} } as Request;
    const naverSignInDto: NaverSignInDto = { code: '1234', state: '1234' };
    const user = User.createManager({
      name: 'gon',
      email: 'gon@naver.com',
      nickname: 'nickname',
      userType: USER_ROLE.MANAGER,
      corporate: '12345678910',
    });
    const userId = 2;
    user.id = userId;

    mockUserService.findOneByEmail.mockResolvedValueOnce(user);

    // when
    const token = await authService.naverSignIn(req, naverSignInDto);

    // then
    const payload = jwtService.decode(token.accessToken);

    expect(token).toHaveProperty('accessToken');
    expect(payload['id']).toBe(userId);
    expect(payload['userRole']).toBe(USER_ROLE.MANAGER);
  });
});
