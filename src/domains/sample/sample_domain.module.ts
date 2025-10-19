import { Module } from '@nestjs/common';
import { SampleService } from './services/sample.service';
import { SAMPLE_SERVICE_TOKEN } from './interfaces/sample.service.interface';
import { SampleInflaImplModule } from '../../infrastructure/postgres/sample.impl.module';

@Module({
  imports: [SampleInflaImplModule],
  providers: [
    {
      provide: SAMPLE_SERVICE_TOKEN,
      useClass: SampleService,
    },
  ],
  exports: [SAMPLE_SERVICE_TOKEN],
})
export class SampleDomainModule {}
