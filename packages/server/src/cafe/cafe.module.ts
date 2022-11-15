import { Module } from '@nestjs/common';
import { CafeService } from './cafe.service';
import { CafeController } from './cafe.controller';

@Module({
  controllers: [CafeController],
  providers: [CafeService]
})
export class CafeModule {}
