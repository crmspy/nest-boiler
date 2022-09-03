import { Injectable } from '@nestjs/common';
import { CreateWabacoreDto } from './dto/create-wabacore.dto';
import { UpdateWabacoreDto } from './dto/update-wabacore.dto';

@Injectable()
export class WabacoreService {
  create(createWabacoreDto: CreateWabacoreDto) {
    return 'This action adds a new wabacore';
  }

  findAll() {
    return `This action returns all wabacore`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wabacore`;
  }

  update(id: number, updateWabacoreDto: UpdateWabacoreDto) {
    return `This action updates a #${id} wabacore`;
  }

  remove(id: number) {
    return `This action removes a #${id} wabacore`;
  }
}
