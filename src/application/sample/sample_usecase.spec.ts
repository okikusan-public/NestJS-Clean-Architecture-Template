import { Test, TestingModule } from '@nestjs/testing';
import { SampleUseCase } from './sample_usecase';
import {
  ISampleService,
  SAMPLE_SERVICE_TOKEN,
} from '../interfaces/sample.service.interface';
import { CreateSampleDto } from '../../interfaces/web/dto/create-sample.dto';
import { SampleResponseDto } from '../../domains/sample/dto/sample-response.dto';

describe('SampleUseCase', () => {
  let useCase: SampleUseCase;

  const mockService: Partial<ISampleService> = {
    getSampleEntities: jest.fn(),
    getSampleById: jest.fn(),
    createSample: jest.fn(),
    updateSample: jest.fn(),
    deleteSample: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SampleUseCase,
        {
          provide: SAMPLE_SERVICE_TOKEN,
          useValue: mockService,
        },
      ],
    }).compile();

    useCase = module.get<SampleUseCase>(SampleUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return an array of sample response DTOs', async () => {
      const mockDtos: SampleResponseDto[] = [
        new SampleResponseDto(1, 'Test 1', 'Description 1'),
        new SampleResponseDto(2, 'Test 2', 'Description 2'),
      ];
      (mockService.getSampleEntities as jest.Mock).mockResolvedValue(mockDtos);

      const result = await useCase.getAll();

      expect(result).toEqual(mockDtos);
      expect(mockService.getSampleEntities).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById', () => {
    it('should return a sample response DTO', async () => {
      const mockDto = new SampleResponseDto(1, 'Test', 'Description');
      (mockService.getSampleById as jest.Mock).mockResolvedValue(mockDto);

      const result = await useCase.getById(1);

      expect(result).toEqual(mockDto);
      expect(mockService.getSampleById).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create and return a sample response DTO', async () => {
      const dto: CreateSampleDto = {
        name: 'New Sample',
        description: 'New Description',
      };
      const mockDto = new SampleResponseDto(1, 'New Sample', 'New Description');
      (mockService.createSample as jest.Mock).mockResolvedValue(mockDto);

      const result = await useCase.create(dto);

      expect(result).toEqual(mockDto);
      expect(mockService.createSample).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should update and return a sample response DTO', async () => {
      const updateDto: Partial<CreateSampleDto> = { name: 'Updated Name' };
      const mockDto = new SampleResponseDto(1, 'Updated Name', 'Description');
      (mockService.updateSample as jest.Mock).mockResolvedValue(mockDto);

      const result = await useCase.update(1, updateDto);

      expect(result).toEqual(mockDto);
      expect(mockService.updateSample).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('delete', () => {
    it('should delete the sample', async () => {
      (mockService.deleteSample as jest.Mock).mockResolvedValue(undefined);

      await useCase.delete(1);

      expect(mockService.deleteSample).toHaveBeenCalledWith(1);
    });
  });
});
