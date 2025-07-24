import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersAccountsModule } from './users-accounts/users-accounts.module';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './login/login.module';
import { HashService } from './hash/hash.service';
// import { HashModule } from './hash/hash.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AbsenceModule } from './absence/absence.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersAccountsModule,
    SupabaseModule,
    LoginModule,
    DashboardModule,
    AbsenceModule,
    // HashModule,
  ],
  controllers: [AppController],
  providers: [AppService, HashService],
})
export class AppModule {}
