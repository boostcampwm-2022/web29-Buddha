import { rest } from 'msw';

const naverOAuthURL = process.env.REACT_APP_NAVER_OAUTH_URL!.split('?')[0];
const api = process.env.REACT_APP_API_SERVER_BASE_URL;

export const authHandlers = [
  // 네이버 로그인 OAuth 요청
  rest.get(naverOAuthURL, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  // OAuth code, state 서버 전송 및 응답
  rest.get(`${api}/user/naver-oauth`, (req, res, ctx) => {
    const { name, email } = req.cookies;

    if (name && email) {
      return res(ctx.status(200));
    }
    return res(ctx.status(303));
  }),
];
