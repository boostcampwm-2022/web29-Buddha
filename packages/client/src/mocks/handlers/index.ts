import { authHandlers } from './auth';
import { menuHandlers } from './menu';

export const handlers = [...authHandlers, ...menuHandlers];
