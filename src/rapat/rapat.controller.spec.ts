import { Test, TestingModule } from '@nestjs/testing';
import { RapatController } from './rapat.controller';
import { RapatService } from './rapat.service';

describe('RapatController', () => {
  let controller: RapatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RapatController],
      providers: [RapatService],
    }).compile();

    controller = module.get<RapatController>(RapatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
