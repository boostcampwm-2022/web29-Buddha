import { Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { HttpExceptionFilter } from './middleware/exception.filter';

export function setNestApp<T extends INestApplication>(app: T): void {
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.enableCors({
    origin: process.env.CLIENT_URI,
    credentials: true,
  });
  app.use(cookieParser());
  app.use(
    session({
      secret: 'buddah!@#$',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 3,
        secure: false,
        httpOnly: true,
      },
      name: 'sid',
    })
  );
}
