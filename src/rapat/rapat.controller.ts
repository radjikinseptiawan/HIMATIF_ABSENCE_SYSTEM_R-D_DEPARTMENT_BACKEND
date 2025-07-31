import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RapatService } from './rapat.service';
import { CreateRapatDto } from './dto/create-rapat.dto';
import { UpdateRapatDto } from './dto/update-rapat.dto';

@Controller('rapat')
export class RapatController {
  constructor(private readonly rapatService: RapatService) {}

  @Post()
  create(@Body() createRapatDto: CreateRapatDto) {
    return this.rapatService.create(createRapatDto);
  }

  @Get()
  findAll() {
    return this.rapatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rapatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRapatDto: UpdateRapatDto) {
    return this.rapatService.update(+id, updateRapatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rapatService.remove(+id);
  }
}
