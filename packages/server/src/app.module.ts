import { getMySQLTestTypeOrmModule } from 'src/utils/getMySQLTestTypeOrmModule';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { routeTable } from './config/route';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { OrderModuleV1 } from './order/order.v1.module';
import { CafeModule } from './cafe/cafe.module';
import { AuthModule } from './auth/auth.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { LoggerMiddleware } from './middleware/logger.http';
import { DataSource } from 'typeorm';
import { OrderModuleV2 } from './order/order.v2.module';
import { OrderModuleV3 } from './order/order.v3.module';

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
    OrderModuleV1,
    OrderModuleV2,
    OrderModuleV3,
    CafeModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
