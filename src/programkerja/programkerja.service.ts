/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProgramkerjaDto } from './dto/create-programkerja.dto';
import { UpdateProgramkerjaDto } from './dto/update-programkerja.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class ProgramkerjaService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createProgramkerjaDto: CreateProgramkerjaDto) {
    const {
      ketua_pelaksana,
      sekertaris_pelaksana,
      sekertaris_pelaksana2,
      bendahara_pelaksana,
      bendahara_pelaksana2,
      notulensi_rapat,
      status,
      tanggal_pelaksanaan,
      nama_program,
    } = createProgramkerjaDto;

    const { data, error } = await this.supabaseService.client
      .from('program_kerja')
      .insert({
        ketua_pelaksana,
        sekertaris_pelaksana,
        sekertaris_pelaksana2,
        bendahara_pelaksana,
        bendahara_pelaksana2,
        status,
        notulensi_rapat,
        tanggal_pelaksanaan,
        nama_program,
      });

    if (error) {
      throw new HttpException(
        {
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      message: 'success add data',
      data: data,
    };
  }

  async findAll() {
    try {
      const { data, error } = await this.supabaseService.client.from(
        'program_kerja',
      ).select(`*,
    ketua_pelaksana:anggota!program_kerja_ketua_pelaksana_fkey(fullname),
    sekertaris_pelaksana:anggota!program_kerja_sekertaris_pelaksana_fkey(fullname),
    sekertaris_pelaksana2:anggota!program_kerja_sekertaris_pelaksana2_fkey(fullname),
    bendahara_pelaksana:anggota!program_kerja_bendahara_pelaksana_fkey(fullname),
    bendahara_pelaksana2:anggota!program_kerja_bendahara_pelaksana2_fkey(fullname)
          `);

      if (error) {
        throw new HttpException(
          { message: 'new Error', error: error },
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        message: 'success fetching data',
        data: data,
      };
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} programkerja`;
  }

  update(id: number, updateProgramkerjaDto: UpdateProgramkerjaDto) {
    return `This action updates a #${id} programkerja`;
  }

  remove(id: number) {
    return `This action removes a #${id} programkerja`;
  }
}
