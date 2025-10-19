import { CreateSampleDto } from '../../domains/sample/dto/create-sample.dto';
import { SampleResponseDto } from '../../domains/sample/dto/sample-response.dto';

export const SAMPLE_SERVICE_TOKEN = 'ISampleService';

export interface ISampleService {
  getSampleEntities(): Promise<SampleResponseDto[]>;
  getSampleById(id: number): Promise<SampleResponseDto>;
  createSample(dto: CreateSampleDto): Promise<SampleResponseDto>;
  updateSample(
    id: number,
    dto: Partial<CreateSampleDto>,
  ): Promise<SampleResponseDto>;
  deleteSample(id: number): Promise<void>;
}
