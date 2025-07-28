import { Test, TestingModule } from '@nestjs/testing';
import { ProgramkerjaService } from './programkerja.service';

describe('ProgramkerjaService', () => {
  let service: ProgramkerjaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgramkerjaService],
    }).compile();

    service = module.get<ProgramkerjaService>(ProgramkerjaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
