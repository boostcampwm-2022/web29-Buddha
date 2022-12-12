import { Module } from '@nestjs/common';
import { RedisCacheService } from './redisCache.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisCacheController } from './redisCache.controller';

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          config: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
            password: configService.get('REDIS_PASSWORD'),
            retryStrategy: (times) => {
              // times => reconnection 시도 횟수
              // if (times >= 5) {
              //   return null;
              // }
              return 1000;
            },
            maxRetriesPerRequest: 1,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [RedisCacheController],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
