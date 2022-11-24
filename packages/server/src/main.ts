import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  await app.listen(8080);
}
bootstrap();
