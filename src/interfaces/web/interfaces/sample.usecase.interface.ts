import { CreateSampleDto } from '../dto/create-sample.dto';
import { SampleResponseDto } from '../../../domains/sample/dto/sample-response.dto';

export const SAMPLE_USECASE_TOKEN = 'SAMPLE_USECASE_TOKEN';

export interface ISampleUseCase {
  getAll(): Promise<SampleResponseDto[]>;
  getById(id: number): Promise<SampleResponseDto>;
  create(dto: CreateSampleDto): Promise<SampleResponseDto>;
  update(id: number, dto: Partial<CreateSampleDto>): Promise<SampleResponseDto>;
  delete(id: number): Promise<void>;
}
