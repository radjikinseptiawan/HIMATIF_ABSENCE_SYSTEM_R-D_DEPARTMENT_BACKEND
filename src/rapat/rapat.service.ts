/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRapatDto } from './dto/create-rapat.dto';
import { UpdateRapatDto } from './dto/update-rapat.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class RapatService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createRapatDto: CreateRapatDto) {
    const { judul, deskripsi, tempat, tanggal, waktu_mulai, waktu_selesai } =
      createRapatDto;

    const { data, error } = await this.supabaseService.client
      .from('rapat')
      .insert({
        judul,
        deskripsi,
        tempat,
        tanggal,
        waktu_mulai,
        waktu_selesai,
      });

    if (error) {
      throw new HttpException(
        {
          error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      message: 'data succcess addeed',
      data: data,
    };
  }

  findAll() {
    return `This action returns all rapat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rapat`;
  }

  update(id: number, updateRapatDto: UpdateRapatDto) {
    return `This action updates a #${id} rapat`;
  }

  remove(id: number) {
    return `This action removes a #${id} rapat`;
  }
}
