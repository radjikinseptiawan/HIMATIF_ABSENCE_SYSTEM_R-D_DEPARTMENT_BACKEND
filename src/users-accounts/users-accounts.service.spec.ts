import { Test, TestingModule } from '@nestjs/testing';
import { UsersAccountsService } from './users-accounts.service';

describe('UsersAccountsService', () => {
  let service: UsersAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersAccountsService],
    }).compile();

    service = module.get<UsersAccountsService>(UsersAccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
