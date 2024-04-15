import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleService } from './services/sample.service';
import { SampleEntity } from './entities/sample.entity';
import { SampleRepository } from './repositories/sample.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SampleEntity])],
  providers: [SampleService, SampleRepository],
  exports: [SampleService],
})
export class SampleDomainModule {}