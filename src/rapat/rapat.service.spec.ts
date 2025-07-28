import { Test, TestingModule } from '@nestjs/testing';
import { RapatService } from './rapat.service';

describe('RapatService', () => {
  let service: RapatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RapatService],
    }).compile();

    service = module.get<RapatService>(RapatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
