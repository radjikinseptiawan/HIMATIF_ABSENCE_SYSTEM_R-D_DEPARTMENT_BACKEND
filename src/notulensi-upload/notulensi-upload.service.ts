/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNotulensiUploadDto } from './dto/create-notulensi-upload.dto';
import { UpdateNotulensiUploadDto } from './dto/update-notulensi-upload.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class NotulensiUploadService {
  constructor(private readonly supabaseService: SupabaseService) {}
  async create(createNotulensiUploadDto: CreateNotulensiUploadDto) {
    try {
      const { announcement, judul } = createNotulensiUploadDto;
      const { data, error } = await this.supabaseService.client
        .from('upload_pengumuman')
        .insert({ judul, files: announcement });

      if (error) {
        throw new HttpException(
          {
            message: 'error',
            error: error,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      return data;
    } catch (error) {
      console.log(error);
    }
    return 'This action adds a new notulensiUpload';
  }

  findAll() {
    return `This action returns all notulensiUpload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notulensiUpload`;
  }

  update(id: number, updateNotulensiUploadDto: UpdateNotulensiUploadDto) {
    return `This action updates a #${id} notulensiUpload`;
  }

  remove(id: number) {
    return `This action removes a #${id} notulensiUpload`;
  }
}
