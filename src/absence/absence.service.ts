/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { UpdateAbsenceDto } from './dto/update-absence.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class AbsenceService {
  constructor(private supabaseService: SupabaseService) {}

  async create(createAbsenceDto: CreateAbsenceDto) {
    const { lokasi, user_id, status = 'Sudah Absen' } = createAbsenceDto;

    const { data, error } = await this.supabaseService.client
      .from('absence_logs')
      .upsert({ lokasi, user_id, status })
      .single();

    if (error) {
      throw new HttpException({ error }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (!data) {
      throw new HttpException(
        { message: 'data is not enought' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return { data: data };
  }

  findAll() {
    return `Find all`;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabaseService.client
      .from('absence_logs')
      .select('*')
      .eq('user_id', id)
      .order('tanggal', { ascending: false })
      .limit(1)
      .single();
    if (error) {
      throw new HttpException({ error }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (!data) {
      throw new HttpException(
        { message: 'data is not enought' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return { data: data };
  }

  async update(user_id: string, updateAbsenceDto: UpdateAbsenceDto) {
    const { data, error } = await this.supabaseService.client
      .from('absence_logs')
      .update({ kehadiran: 'Belum Absen' })
      .eq('user_id', user_id);
    if (error) {
      throw new HttpException({ error }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return { data };
  }

  remove(id: number) {
    return `This action removes a #${id} absence`;
  }
}
