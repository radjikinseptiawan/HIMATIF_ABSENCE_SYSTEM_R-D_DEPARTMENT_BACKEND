import { Test, TestingModule } from '@nestjs/testing';
import { NotulensiUploadService } from './notulensi-upload.service';

describe('NotulensiUploadService', () => {
  let service: NotulensiUploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotulensiUploadService],
    }).compile();

    service = module.get<NotulensiUploadService>(NotulensiUploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
