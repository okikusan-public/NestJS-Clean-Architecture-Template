import { Module } from '@nestjs/common';
import { SampleController } from './sample_control';
import { SampleModule } from '../../application/sample/sample_usecase.module';

@Module({
  imports: [SampleModule],
  controllers: [SampleController],
})
export class SampleWebModule {}
