// sample/sample_domain.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleService } from './services/sample.service';
import { SampleEntity } from './entities/sample.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SampleEntity])],
  providers: [SampleService],
  exports: [SampleService],
})
export class SampleDomainModule {}