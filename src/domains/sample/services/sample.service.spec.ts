import { Test, TestingModule } from '@nestjs/testing';
import { SampleService } from './sample.service';
import {
  ISampleRepository,
  SAMPLE_REPOSITORY_TOKEN,
} from '../repositories/sample.repository.interface';
import { SampleEntity } from '../entities/sample.entity';
import { CreateSampleDto } from '../../../interfaces/web/dto/create-sample.dto';
import { SampleNotFoundException } from '../exceptions/sample-not-found.exception';

describe('SampleService', () => {
  let service: SampleService;

  const mockRepository: Partial<ISampleRepository> = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SampleService,
        {
          provide: SAMPLE_REPOSITORY_TOKEN,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SampleService>(SampleService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getSampleEntities', () => {
    it('should return an array of sample response DTOs', async () => {
      const mockEntities: SampleEntity[] = [
        new SampleEntity(1, 'Test 1', 'Description 1'),
        new SampleEntity(2, 'Test 2', 'Description 2'),
      ];
      (mockRepository.findAll as jest.Mock).mockResolvedValue(mockEntities);

      const result = await service.getSampleEntities();

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: 1,
        name: 'Test 1',
        description: 'Description 1',
      });
      expect(result[1]).toEqual({
        id: 2,
        name: 'Test 2',
        description: 'Description 2',
      });
      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when no entities exist', async () => {
      (mockRepository.findAll as jest.Mock).mockResolvedValue([]);

      const result = await service.getSampleEntities();

      expect(result).toEqual([]);
      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSampleById', () => {
    it('should return a sample response DTO when entity is found', async () => {
      const mockEntity = new SampleEntity(1, 'Test', 'Description');
      (mockRepository.findById as jest.Mock).mockResolvedValue(mockEntity);

      const result = await service.getSampleById(1);

      expect(result).toEqual({
        id: 1,
        name: 'Test',
        description: 'Description',
      });
      expect(mockRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should throw SampleNotFoundException when entity not found', async () => {
      (mockRepository.findById as jest.Mock).mockResolvedValue(null);

      await expect(service.getSampleById(999)).rejects.toThrow(
        SampleNotFoundException,
      );
      expect(mockRepository.findById).toHaveBeenCalledWith(999);
    });
  });

  describe('createSample', () => {
    it('should create and return a sample response DTO', async () => {
      const dto: CreateSampleDto = {
        name: 'New Sample',
        description: 'New Description',
      };
      const mockEntity = new SampleEntity(1, dto.name, dto.description);
      (mockRepository.create as jest.Mock).mockResolvedValue(mockEntity);

      const result = await service.createSample(dto);

      expect(result).toEqual({
        id: 1,
        name: 'New Sample',
        description: 'New Description',
      });
      expect(mockRepository.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('updateSample', () => {
    it('should update and return a sample response DTO when entity is found', async () => {
      const updateDto: Partial<CreateSampleDto> = { name: 'Updated Name' };
      const mockEntity = new SampleEntity(1, 'Updated Name', 'Description');
      (mockRepository.update as jest.Mock).mockResolvedValue(mockEntity);

      const result = await service.updateSample(1, updateDto);

      expect(result).toEqual({
        id: 1,
        name: 'Updated Name',
        description: 'Description',
      });
      expect(mockRepository.update).toHaveBeenCalledWith(1, updateDto);
    });

    it('should throw SampleNotFoundException when entity not found', async () => {
      (mockRepository.update as jest.Mock).mockResolvedValue(null);

      await expect(
        service.updateSample(999, { name: 'Updated' }),
      ).rejects.toThrow(SampleNotFoundException);
      expect(mockRepository.update).toHaveBeenCalledWith(999, {
        name: 'Updated',
      });
    });
  });

  describe('deleteSample', () => {
    it('should delete the sample when entity is found', async () => {
      (mockRepository.delete as jest.Mock).mockResolvedValue(true);

      await service.deleteSample(1);

      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw SampleNotFoundException when entity not found', async () => {
      (mockRepository.delete as jest.Mock).mockResolvedValue(false);

      await expect(service.deleteSample(999)).rejects.toThrow(
        SampleNotFoundException,
      );
      expect(mockRepository.delete).toHaveBeenCalledWith(999);
    });
  });
});
