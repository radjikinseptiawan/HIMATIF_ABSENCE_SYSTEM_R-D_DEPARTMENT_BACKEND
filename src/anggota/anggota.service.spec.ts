import { Test, TestingModule } from '@nestjs/testing';
import { AnggotaService } from './anggota.service';

describe('AnggotaService', () => {
  let service: AnggotaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnggotaService],
    }).compile();

    service = module.get<AnggotaService>(AnggotaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
