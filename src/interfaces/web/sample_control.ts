import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Inject,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import {
  ISampleUseCase,
  SAMPLE_USECASE_TOKEN,
} from './interfaces/sample.usecase.interface';
import { CreateSampleDto } from './dto/create-sample.dto';
import { SampleResponseDto } from '../../domains/sample/dto/sample-response.dto';
import { DomainExceptionFilter } from './filters/domain-exception.filter';

@Controller('samples')
@UseFilters(DomainExceptionFilter)
export class SampleController {
  constructor(
    @Inject(SAMPLE_USECASE_TOKEN)
    private readonly sampleUseCase: ISampleUseCase,
  ) {}

  @Get()
  async getSamples(): Promise<{ data: SampleResponseDto[] }> {
    const result = await this.sampleUseCase.getAll();
    return { data: result };
  }

  @Get(':id')
  async getSample(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ data: SampleResponseDto }> {
    const result = await this.sampleUseCase.getById(id);
    return { data: result };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createSample(
    @Body() dto: CreateSampleDto,
  ): Promise<{ data: SampleResponseDto }> {
    const result = await this.sampleUseCase.create(dto);
    return { data: result };
  }

  @Put(':id')
  async updateSample(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateSampleDto>,
  ): Promise<{ data: SampleResponseDto }> {
    const result = await this.sampleUseCase.update(id, dto);
    return { data: result };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSample(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.sampleUseCase.delete(id);
  }
}
