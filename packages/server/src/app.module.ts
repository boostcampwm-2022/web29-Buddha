import { getMySQLTestTypeOrmModule } from 'src/utils/getMySQLTestTypeOrmModule';
import { routeTable } from './../config/route';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { CafeModule } from './cafe/cafe.module';
import { AuthModule } from './auth/auth.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { LoggerMiddleware } from './middleware/logger.http';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? '.dev.env'
          : process.env.NODE_ENV === 'test'
          ? '.test.env'
          : '.prod.env',
    }),
    process.env.NODE_ENV === 'test'
      ? getMySQLTestTypeOrmModule()
      : TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => {
            return {
              type: 'mysql',
              host: configService.get('MYSQL_HOST'),
              port: parseInt(configService.get('MYSQL_PORT')),
              username: configService.get('MYSQL_USERNAME'),
              password: configService.get('MYSQL_PASSWORD'),
              database: configService.get('MYSQL_DATABASE'),
              entities: ['dist/**/*.entity{.ts,.js}'],
              synchronize: configService.get('NODE_ENV') === 'development',
            };
          },
          inject: [ConfigService],
        }),
    RouterModule.register([routeTable]),
    UserModule,
    OrderModule,
    CafeModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
