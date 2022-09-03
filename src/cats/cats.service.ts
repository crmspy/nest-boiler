import { Inject, Injectable } from '@nestjs/common';
import { where } from 'sequelize/types';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @Inject('CATS_REPOSITORY')
    private catsRepository: typeof Cat,
  ) {}
  async findAll(): Promise<Cat[]> {
    return this.catsRepository.findAll<Cat>();
  }

  async findOne(id: number): Promise<Cat> {
    return this.catsRepository.findByPk<Cat>(id);
  }
  // private readonly cats: CreateCatDto[] = [];
  create(catData: CreateCatDto) {
    //this.cats.push(cat);
    return this.catsRepository.create({ ...catData });
  }
  // findAll(): CreateCatDto[] {
  //   return this.cats;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} cat`;
  // }
  update(id: number, catData: UpdateCatDto) {
    return this.catsRepository.update(
      { ...catData },
      {
        where: {
          id: id,
        },
      },
    );
  }
  remove(id: number) {
    return this.catsRepository.destroy({
      where: {
        id: id,
      },
    });
  }
}
