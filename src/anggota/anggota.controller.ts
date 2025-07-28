import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnggotaService } from './anggota.service';
import { CreateAnggotaDto } from './dto/create-anggota.dto';
import { UpdateAnggotaDto } from './dto/update-anggota.dto';

@Controller('anggota')
export class AnggotaController {
  constructor(private readonly anggotaService: AnggotaService) {}

  @Post()
  create(@Body() createAnggotaDto: CreateAnggotaDto) {
    return this.anggotaService.create(createAnggotaDto);
  }

  @Get()
  findAll() {
    return this.anggotaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anggotaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnggotaDto: UpdateAnggotaDto) {
    return this.anggotaService.update(+id, updateAnggotaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.anggotaService.remove(+id);
  }
}
