/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class DashboardService {
  constructor(private readonly supabaseService: SupabaseService) {}
  create(createDashboardDto: CreateDashboardDto) {
    return 'This action adds a new dashboard';
  }

  findAll() {
    return 'Test';
  }

  async findOne(id: string) {
    const { data: profileData, error: profileError } =
      await this.supabaseService.client
        .from('profile')
        .select('*')
        .eq('user_id', id)
        .single();

    if (profileError) {
      throw new HttpException('failed requesting data', HttpStatus.BAD_REQUEST);
    }

    if (!profileData) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }

    return {
      data: profileData,
    };
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}
