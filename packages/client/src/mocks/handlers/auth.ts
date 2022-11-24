import { rest, RestRequest } from 'msw';
import { SignupRequestBody } from '@/types/Signup';

const naverOAuthURL = process.env.REACT_APP_NAVER_OAUTH_URL!.split('?')[0];
const api = process.env.REACT_APP_API_SERVER_BASE_URL;

export const authHandlers = [
  // 네이버 로그인 OAuth 요청
  rest.get(naverOAuthURL, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  // OAuth code, state 서버 전송 및 응답
  rest.get(`${api}/auth/naver-oauth`, (req, res, ctx) => {
    const { name, email } = req.cookies;

    if (name && email) {
      return res(ctx.status(200));
    }
    return res(ctx.status(303));
  }),
  rest.post(
    `${api}/auth/signup`,
    (req: RestRequest<SignupRequestBody>, res, next) => {
      const { userType, nickname, corporate } = req.body;
      if (userType === 'MANAGER' && corporate && nickname) {
        return res(next.status(201));
      } else if (userType === 'CLIENT' && nickname) {
        return res(next.status(201));
      } else {
        return res(next.status(400));
      }
    }
  ),
];
