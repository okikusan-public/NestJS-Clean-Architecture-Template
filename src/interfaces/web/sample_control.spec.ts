import { Test, TestingModule } from '@nestjs/testing';
import { SampleController } from './sample_control';
import {
  ISampleUseCase,
  SAMPLE_USECASE_TOKEN,
} from './interfaces/sample.usecase.interface';
import { CreateSampleDto } from './dto/create-sample.dto';
import { SampleResponseDto } from '../../domains/sample/dto/sample-response.dto';

describe('SampleController', () => {
  let controller: SampleController;

  const mockUseCase: Partial<ISampleUseCase> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SampleController],
      providers: [
        {
          provide: SAMPLE_USECASE_TOKEN,
          useValue: mockUseCase,
        },
      ],
    }).compile();

    controller = module.get<SampleController>(SampleController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getSamples', () => {
    it('should return an array of samples wrapped in data object', async () => {
      const mockDtos: SampleResponseDto[] = [
        new SampleResponseDto(1, 'Test 1', 'Description 1'),
        new SampleResponseDto(2, 'Test 2', 'Description 2'),
      ];
      (mockUseCase.getAll as jest.Mock).mockResolvedValue(mockDtos);

      const result = await controller.getSamples();

      expect(result).toEqual({ data: mockDtos });
      expect(mockUseCase.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSample', () => {
    it('should return a single sample wrapped in data object', async () => {
      const mockDto = new SampleResponseDto(1, 'Test', 'Description');
      (mockUseCase.getById as jest.Mock).mockResolvedValue(mockDto);

      const result = await controller.getSample(1);

      expect(result).toEqual({ data: mockDto });
      expect(mockUseCase.getById).toHaveBeenCalledWith(1);
    });
  });

  describe('createSample', () => {
    it('should create and return a sample wrapped in data object', async () => {
      const dto: CreateSampleDto = {
        name: 'New Sample',
        description: 'New Description',
      };
      const mockDto = new SampleResponseDto(1, 'New Sample', 'New Description');
      (mockUseCase.create as jest.Mock).mockResolvedValue(mockDto);

      const result = await controller.createSample(dto);

      expect(result).toEqual({ data: mockDto });
      expect(mockUseCase.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('updateSample', () => {
    it('should update and return a sample wrapped in data object', async () => {
      const updateDto: Partial<CreateSampleDto> = { name: 'Updated Name' };
      const mockDto = new SampleResponseDto(1, 'Updated Name', 'Description');
      (mockUseCase.update as jest.Mock).mockResolvedValue(mockDto);

      const result = await controller.updateSample(1, updateDto);

      expect(result).toEqual({ data: mockDto });
      expect(mockUseCase.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('deleteSample', () => {
    it('should delete a sample', async () => {
      (mockUseCase.delete as jest.Mock).mockResolvedValue(undefined);

      await controller.deleteSample(1);

      expect(mockUseCase.delete).toHaveBeenCalledWith(1);
    });
  });
});
