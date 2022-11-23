import { Menu } from 'src/cafe/entities/menu.entity';
import { CafeService } from './cafe.service';
import { Cafe } from './entities/cafe.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

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
    describe('findAllMenuById()', () => {
      it('should be find All', async () => {
        const cafeId = 1;

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

      it('should fail on exception', async () => {
        const cafeId = -100000;

        cafeRepository.findOne.mockRejectedValue(
          new NotFoundException('find error')
        );

        // service.findAllMenuById(cafeID)를 expect 바깥에 사용하면
        // new NotFoundException 에러가 바로 발동해서 테스트 도중에 런타임 에러가 잡혀 테스트를 진행할 수 없다.
        await expect(service.findAllMenuById(cafeId)).rejects.toThrow(
          new NotFoundException('find error')
        );
      });

      it('검색은 성공했지만 해당 cafe가 없는 경우', async () => {
        const cafeId = 100000;

        cafeRepository.findOne.mockResolvedValue(null);

        await expect(
          async () => await service.findAllMenuById(cafeId)
        ).rejects.toThrowError(new BadRequestException('cafeId not exist'));
      });
    });
  });
});
