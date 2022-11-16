import { Test, TestingModule } from '@nestjs/testing';
import { CafeService } from './cafe.service';

describe('CafeService', () => {
  let service: CafeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CafeService],
    }).compile();

    service = module.get<CafeService>(CafeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
