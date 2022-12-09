import { rest } from 'msw';
import { orderListData, requestedOrderData } from '@/mocks/data/order';

const api = process.env.REACT_APP_API_SERVER_BASE_URL;

export const orderHandlers = [
  rest.get(`${api}/order`, (req, res, next) => {
    return res(next.json(orderListData));
  }),
  rest.get(`${api}/order/requested`, (req, res, next) => {
    return res(next.json(requestedOrderData));
  }),
  rest.post(`${api}/order`, (req, res, next) => {
    return res(next.status(201));
  })
];
