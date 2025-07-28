import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProgramkerjaService } from './programkerja.service';
import { CreateProgramkerjaDto } from './dto/create-programkerja.dto';
import { UpdateProgramkerjaDto } from './dto/update-programkerja.dto';

@Controller('programkerja')
export class ProgramkerjaController {
  constructor(private readonly programkerjaService: ProgramkerjaService) {}

  @Post()
  create(@Body() createProgramkerjaDto: CreateProgramkerjaDto) {
    return this.programkerjaService.create(createProgramkerjaDto);
  }

  @Get()
  findAll() {
    return this.programkerjaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programkerjaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProgramkerjaDto: UpdateProgramkerjaDto,
  ) {
    return this.programkerjaService.update(+id, updateProgramkerjaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programkerjaService.remove(+id);
  }
}
