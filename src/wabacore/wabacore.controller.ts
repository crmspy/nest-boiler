import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WabacoreService } from './wabacore.service';
import { CreateWabacoreDto } from './dto/create-wabacore.dto';
import { UpdateWabacoreDto } from './dto/update-wabacore.dto';

@Controller('wabacore')
export class WabacoreController {
  constructor(private readonly wabacoreService: WabacoreService) {}

  @Post()
  create(@Body() createWabacoreDto: CreateWabacoreDto) {
    return this.wabacoreService.create(createWabacoreDto);
  }

  @Get()
  findAll() {
    return this.wabacoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wabacoreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWabacoreDto: UpdateWabacoreDto) {
    return this.wabacoreService.update(+id, updateWabacoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wabacoreService.remove(+id);
  }
}
