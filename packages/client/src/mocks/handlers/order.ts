import { rest } from 'msw';
import {
  orderListData,
  requestedOrderData,
  orderStatusData,
  acceptedOrderData,
} from '@/mocks/data/order';

const api = process.env.REACT_APP_API_SERVER_BASE_URL;

export const orderHandlers = [
  rest.get(`${api}/order`, (req, res, next) => {
    return res(next.json(orderListData));
  }),
  rest.get(`${api}/order/requested`, (req, res, next) => {
    return res(next.json(requestedOrderData));
  }),
  rest.get(`${api}/order/accepted`, (req, res, next) => {
    return res(next.json(acceptedOrderData));
  }),
  rest.post(`${api}/order/accepted`, (req, res, next) => {
    return res(next.status(200));
  }),
  rest.post(`${api}/order/rejected`, (req, res, next) => {
    return res(next.status(200));
  }),
  rest.post(`${api}/order/completed`, (req, res, next) => {
    return res(next.status(200));
  }),
  rest.post(`${api}/order`, (req, res, next) => {
    return res(next.status(201));
  }),
  rest.get(`${api}/order/1`, (req, res, next) => {
    return res(next.json(orderStatusData.REQUESTED));
  }),
  rest.get(`${api}/order/2`, (req, res, next) => {
    return res(next.json(orderStatusData.ACCEPTED));
  }),
  rest.get(`${api}/order/3`, (req, res, next) => {
    return res(next.json(orderStatusData.COMPLETED));
  }),
  rest.get(`${api}/order/4`, (req, res, next) => {
    return res(next.json(orderStatusData.REJECTED));
  }),
];
