import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { LoggerInterceptor } from 'src/common/logger.interceptor';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { ValidationPipe } from './validation/validation.pipe';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  //@UseFilters(new HttpExceptionFilter())
  //@UseInterceptors(new LoggerInterceptor())
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  //@UseFilters(new HttpExceptionFilter())
  //@UseInterceptors(new LoggerInterceptor())
  findOne(@Param('id', ParseIntPipe) id: number) {
    //throw new SuccessException();
    return this.catsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.catsService.remove(+id);
  }
}
