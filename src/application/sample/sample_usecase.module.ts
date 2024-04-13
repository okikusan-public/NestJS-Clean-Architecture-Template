import { Module } from '@nestjs/common';
import { SampleUseCase } from './sample_usecase';
import { SampleDomainModule } from '../../domains/sample/sample_domain.module';

@Module({
  imports: [SampleDomainModule],
  providers: [SampleUseCase],
  exports: [SampleUseCase],
})
export class SampleModule {}