import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async getUserInfoFromNaver(code: string, state: string) {
    const { access_token } = await this._getTokens(code, state);
    return await this._getUserInfo(access_token);
  }

  setSession(req: Request, email: string, name: string) {
    const session: any = req.session;
    session.name = name;
    session.email = email;
  }

  async _getTokens(code: string, state: string) {
    const redirectURI = encodeURI(
      'http://localhost:8080/api/v1/user/naver-oauth'
    );
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;

    const api_url =
      'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=' +
      clientId +
      '&client_secret=' +
      clientSecret +
      '&redirect_uri=' +
      redirectURI +
      '&code=' +
      code +
      '&state=' +
      state;
    const apiRes = await this.httpService.axiosRef.get(api_url, {
      headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret,
      },
    });
    // 유효성 검사

    return apiRes.data;
  }

  async _getUserInfo(access_token: string) {
    const api_url = 'https://openapi.naver.com/v1/nid/me';
    const apiRes = await this.httpService.axiosRef.get(api_url, {
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    });
    return apiRes.data.response;
  }
}

// https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=YIMdxKjzC0ZIN_laeHBQ&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fv1%2Fuser%2Fnaver-oauth&state=1234
