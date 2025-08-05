/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { NotulensiUploadService } from './notulensi-upload.service';
import { CreateNotulensiUploadDto } from './dto/create-notulensi-upload.dto';
import { UpdateNotulensiUploadDto } from './dto/update-notulensi-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { SupabaseService } from 'src/supabase/supabase.service';
@Controller('notulensi-upload')
export class NotulensiUploadController {
  supabase: any;
  constructor(
    private readonly notulensiUploadService: NotulensiUploadService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    const buffer = file.buffer;
    const dto: CreateNotulensiUploadDto = {
      judul: body.judul,
      announcement: buffer,
    };
    return this.notulensiUploadService.create(dto);
  }

  @Get()
  findAll() {
    return this.notulensiUploadService.findAll();
  }

  @Get('download/:id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const { data, error } = await this.supabaseService.client
      .from('program_kerja')
      .select('notulensi_rapat')
      .eq('id_program', id)
      .single();
    if (error || !data) {
      return res.status(404).send('Notulensi tidak ditemukan');
    }
    const { notulensi_rapat } = data;
    const buffer = Buffer.from(notulensi_rapat);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=notulensi-${id}.pdf`,
    );
    return res.send(buffer);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotulensiUploadDto: UpdateNotulensiUploadDto,
  ) {
    return this.notulensiUploadService.update(+id, updateNotulensiUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notulensiUploadService.remove(+id);
  }
}
