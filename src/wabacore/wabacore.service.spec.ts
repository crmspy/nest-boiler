import { Test, TestingModule } from '@nestjs/testing';
import { WabacoreService } from './wabacore.service';

describe('WabacoreService', () => {
  let service: WabacoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WabacoreService],
    }).compile();

    service = module.get<WabacoreService>(WabacoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
