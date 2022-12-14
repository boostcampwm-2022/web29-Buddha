import { setNestApp } from 'src/setNestApp';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare module 'express-session' {
  interface SessionData {
    name: string;
    email: string;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setNestApp(app);
  await app.listen(8080);
}
bootstrap();
