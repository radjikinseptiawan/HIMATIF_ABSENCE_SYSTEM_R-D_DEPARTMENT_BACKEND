import { Test, TestingModule } from '@nestjs/testing';
import { UsersAccountsController } from './users-accounts.controller';
import { UsersAccountsService } from './users-accounts.service';

describe('UsersAccountsController', () => {
  let controller: UsersAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersAccountsController],
      providers: [UsersAccountsService],
    }).compile();

    controller = module.get<UsersAccountsController>(UsersAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
