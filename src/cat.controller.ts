import {
  Controller,
  Get,
  Req,
  Post,
  HttpCode,
  Header,
  Redirect,
  Query,
  Param,
  Body,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './create-cat.dto';
import { ForbiddenException, SuccessException } from './forbidden.exception';
import { HttpExceptionFilter } from './common/http-exception.filter';
@Controller('cats')
export class CatController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get('number')
  findNUmber(): number {
    return 12;
  }

  @Post('object')
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  findObject(@Req() request: Request): string {
    return request.body;
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Get('id/:id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }

  @Get('async')
  async findAsync(): Promise<any[]> {
    return [];
  }

  @Get('observable')
  observable(): Observable<any[]> {
    return of([]);
  }

  @Post('create')
  async create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get('exception')
  async findException() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Get('exception-manual')
  async findAllexception() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      },
      HttpStatus.FORBIDDEN,
    );
  }

  @Get('exception-custom')
  async findAllCustom() {
    throw new SuccessException();
  }

  @Post('exception-filter')
  @UseFilters(new HttpExceptionFilter())
  async createx(@Body() createCatDto: CreateCatDto) {
    throw new SuccessException();
  }
}
