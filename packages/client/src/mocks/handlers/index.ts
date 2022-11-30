import { authHandlers } from './auth';
import { menuHandlers } from './menu';
import { orderHandlers } from './order';

export const handlers = [...authHandlers, ...menuHandlers, ...orderHandlers];
