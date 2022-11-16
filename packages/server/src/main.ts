import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import sessionFileStore from 'session-file-store';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'buddah!@#$',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
      },
      store: new sessionFileStore(session)(),
      name: 'sid',
    })
  );
  await app.listen(8080);
}
bootstrap();
