import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NaverOAuthService {
  constructor(private readonly httpService: HttpService) {}

  async getTokens(code: string, state: string) {
    const redirectURI = encodeURIComponent(process.env.CLIENT_URI);

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

    return apiRes.data;
  }

  async getUserInfo(access_token: string) {
    const api_url = 'https://openapi.naver.com/v1/nid/me';
    const apiRes = await this.httpService.axiosRef.get(api_url, {
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    });

    return apiRes.data.response;
  }
}
