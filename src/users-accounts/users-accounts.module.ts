import { Module } from '@nestjs/common';
import { UsersAccountsService } from './users-accounts.service';
import { UsersAccountsController } from './users-accounts.controller';
import { SupabaseService } from 'src/supabase/supabase.service';
import { HashService } from 'src/hash/hash.service';

@Module({
  controllers: [UsersAccountsController],
  providers: [UsersAccountsService, SupabaseService, HashService],
})
export class UsersAccountsModule {}
