import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(
    session({
      secret: 'buddah!@#$',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 5000,
        secure: false,
        httpOnly: true,
      },
      name: 'sid',
    })
  );
  await app.listen(8080);
}
bootstrap();
