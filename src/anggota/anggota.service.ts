/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { CreateAnggotaDto } from './dto/create-anggota.dto';
import { UpdateAnggotaDto } from './dto/update-anggota.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class AnggotaService {
  constructor(private readonly supabaseService: SupabaseService) {}

  create(createAnggotaDto: CreateAnggotaDto) {
    return 'This action adds a new anggota';
  }

  async findAll() {
    const { data, error } = await this.supabaseService.client
      .from('anggota')
      .select('*');
    if(error){
      return {
        message : "failed",
        error
      }
    }
    return {
      message: 'succss getting data',
      data,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} anggota`;
  }

  update(id: number, updateAnggotaDto: UpdateAnggotaDto) {
    return `This action updates a #${id} anggota`;
  }

  remove(id: number) {
    return `This action removes a #${id} anggota`;
  }
}
