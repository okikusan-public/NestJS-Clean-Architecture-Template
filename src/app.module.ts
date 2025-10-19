import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import ormconfig from '../ormconfig';
import { SampleWebModule } from './interfaces/web/sample_control.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), SampleWebModule],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
