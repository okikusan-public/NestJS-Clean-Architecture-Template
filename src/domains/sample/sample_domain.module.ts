import { Module } from '@nestjs/common';
import { SampleService } from './services/sample.service';
import { SampleInflaImplModule } from '../../infrastructure/postgres/sample.impl.module';

@Module({
  imports: [SampleInflaImplModule],
  providers: [SampleService],
  exports: [SampleService],
})
export class SampleDomainModule {}