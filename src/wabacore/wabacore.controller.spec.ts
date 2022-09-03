import { Test, TestingModule } from '@nestjs/testing';
import { WabacoreController } from './wabacore.controller';
import { WabacoreService } from './wabacore.service';

describe('WabacoreController', () => {
  let controller: WabacoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WabacoreController],
      providers: [WabacoreService],
    }).compile();

    controller = module.get<WabacoreController>(WabacoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
