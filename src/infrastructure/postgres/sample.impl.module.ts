import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleOrmEntity } from './entities/sample.orm-entity';
import { SAMPLE_REPOSITORY_TOKEN } from '../../domains/sample/repositories/sample.repository.interface';
import { SampleRepositoryImpl } from './sample.impl';

@Module({
  imports: [TypeOrmModule.forFeature([SampleOrmEntity])],
  providers: [
    {
      provide: SAMPLE_REPOSITORY_TOKEN,
      useClass: SampleRepositoryImpl,
    },
  ],
  exports: [SAMPLE_REPOSITORY_TOKEN],
})
export class SampleInflaImplModule {}
