import { Module } from '@nestjs/common';
import { WabacoreService } from './wabacore.service';
import { WabacoreController } from './wabacore.controller';

@Module({
  controllers: [WabacoreController],
  providers: [WabacoreService]
})
export class WabacoreModule {}
