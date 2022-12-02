import { CafeService } from '../../../cafe.service';
import { CafeModule } from 'src/cafe/cafe.module';
import { Cafe } from 'src/cafe/entities/cafe.entity';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getMySQLTestTypeOrmModule } from 'src/utils/getMySQLTestTypeOrmModule';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Menu } from 'src/cafe/entities/menu.entity';

describe('Cafe Service', () => {
  let sut: CafeService;
  let cafeRepository: Repository<Cafe>;
  let menuRepository: Repository<Menu>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CafeModule, getMySQLTestTypeOrmModule()],
      providers: [
        CafeService,
        // mock Repository가 아니라 진짜 typeORM이 만들어준 Repository 사용
        {
          provide: getRepositoryToken(Cafe),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Menu),
          useClass: Repository,
        },
      ],
    }).compile();

    sut = module.get<CafeService>(CafeService);
    cafeRepository = module.get<Repository<Cafe>>(getRepositoryToken(Cafe));
    menuRepository = module.get<Repository<Menu>>(getRepositoryToken(Menu));
  });

  beforeEach(async () => {
    await cafeRepository.query('set foreign_key_checks = 0');
    await cafeRepository.clear();
    await cafeRepository.query('set foreign_key_checks = 1');

    await menuRepository.query('set foreign_key_checks = 0');
    await menuRepository.clear();
    await menuRepository.query('set foreign_key_checks = 1');
  });

  it('findAllMenuById', async () => {
    //given
    const cafe = Cafe.of({
      id: 1,
      name: '스타벅스',
      description: '대야동점',
      latitude: 36,
      longitude: 40,
      address: '경기도 시흥시 은행로',
    });
    await cafeRepository.save(cafe);

    // when
    const menus = await sut.findAllMenuById(cafe.id);

    // then
    expect(menus.id).toBe(menus.id);
    expect(menus.name).toBe(menus.name);
  });
});
