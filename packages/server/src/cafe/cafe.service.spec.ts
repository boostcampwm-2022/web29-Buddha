import { Menu } from 'src/cafe/entities/menu.entity';
import { CafeService } from './cafe.service';
import { Cafe } from './entities/cafe.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

const mockCafeRepository = () => ({
  findOne: jest.fn(),
});

const mockMenuRepository = () => ({
  findOne: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('CafeService', () => {
  let service: CafeService;
  let cafeRepository: MockRepository<Cafe>;
  let menuRepository: MockRepository<Menu>;

  beforeEach(async () => {
    //testmodule에서 기존에 provider에 의존성을 주입하는 것처럼
    // 의존성 있는 모든 provider에 mocking provider 주입해야됨
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CafeService,
        {
          provide: getRepositoryToken(Cafe),
          useValue: mockCafeRepository(),
        },
        {
          provide: getRepositoryToken(Menu),
          useValue: mockMenuRepository(),
        },
      ],
    }).compile();

    service = module.get<CafeService>(CafeService);
    cafeRepository = module.get<MockRepository<Cafe>>(getRepositoryToken(Cafe));
    menuRepository = module.get<MockRepository<Cafe>>(getRepositoryToken(Cafe));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('CafeService', () => {
    describe('findAll()', () => {
      const cafeId = 1;

      it('should be find All', async () => {
        const mockData = {
          id: 1,
          name: 'Cafe name 1',
          cafeMenus: [
            {
              menu: {
                id: 1,
                name: '민트 콜드 브루',
                thumbnail:
                  'https://www.istarbucks.co.kr/upload/store/skuimg/2022/10/[9200000004312]_20221005145029134.jpg',
                price: 4000,
                category: '콜드 브루',
              },
            },
            {
              menu: {
                id: 2,
                name: '오트 크림 스카치 콜드 브루',
                thumbnail:
                  'https://www.istarbucks.co.kr/upload/store/skuimg/2022/10/[9200000004279]_20221017113059439.jpg',
                price: 6000,
                category: '콜드 브루',
              },
            },
          ],
        };
        cafeRepository.findOne.mockResolvedValue(mockData);

        const result = await service.findAllMenuById(cafeId);

        expect(cafeRepository.findOne).toHaveBeenCalledTimes(1);

        expect(result.id).toEqual(mockData.id);
        expect(result.menus.length).toEqual(mockData.cafeMenus.length);
      });
    });
  });
});
