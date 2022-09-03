import { PartialType } from '@nestjs/mapped-types';
import { CreateWabacoreDto } from './create-wabacore.dto';

export class UpdateWabacoreDto extends PartialType(CreateWabacoreDto) {}
