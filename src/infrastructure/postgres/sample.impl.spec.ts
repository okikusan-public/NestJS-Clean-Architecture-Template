import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SampleRepositoryImpl } from './sample.impl';
import { SampleEntity } from '../../domains/sample/entities/sample.entity';
import { CreateSampleDto } from '../../domains/sample/dto/create-sample.dto';

describe('SampleRepositoryImpl', () => {
  let repository: SampleRepositoryImpl;

  const mockTypeormRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SampleRepositoryImpl,
        {
          provide: getRepositoryToken(SampleEntity),
          useValue: mockTypeormRepository,
        },
      ],
    }).compile();

    repository = module.get<SampleRepositoryImpl>(SampleRepositoryImpl);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of sample entities', async () => {
      const mockEntities: SampleEntity[] = [
        { id: 1, name: 'Test 1', description: 'Description 1' },
        { id: 2, name: 'Test 2', description: 'Description 2' },
      ];
      mockTypeormRepository.find.mockResolvedValue(mockEntities);

      const result = await repository.findAll();

      expect(result).toEqual(mockEntities);
      expect(mockTypeormRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when no entities exist', async () => {
      mockTypeormRepository.find.mockResolvedValue([]);

      const result = await repository.findAll();

      expect(result).toEqual([]);
      expect(mockTypeormRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should return a sample entity when found', async () => {
      const mockEntity: SampleEntity = {
        id: 1,
        name: 'Test',
        description: 'Description',
      };
      mockTypeormRepository.findOne.mockResolvedValue(mockEntity);

      const result = await repository.findById(1);

      expect(result).toEqual(mockEntity);
      expect(mockTypeormRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return null when entity not found', async () => {
      mockTypeormRepository.findOne.mockResolvedValue(null);

      const result = await repository.findById(999);

      expect(result).toBeNull();
      expect(mockTypeormRepository.findOne).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });
  });

  describe('create', () => {
    it('should create and return a new sample entity', async () => {
      const dto: CreateSampleDto = {
        name: 'New Sample',
        description: 'New Description',
      };
      const mockEntity: SampleEntity = { id: 1, ...dto };

      mockTypeormRepository.create.mockReturnValue(mockEntity);
      mockTypeormRepository.save.mockResolvedValue(mockEntity);

      const result = await repository.create(dto);

      expect(result).toEqual(mockEntity);
      expect(mockTypeormRepository.create).toHaveBeenCalledWith(dto);
      expect(mockTypeormRepository.save).toHaveBeenCalledWith(mockEntity);
    });
  });

  describe('update', () => {
    it('should update and return the entity when found', async () => {
      const existingEntity: SampleEntity = {
        id: 1,
        name: 'Old Name',
        description: 'Old Description',
      };
      const updateDto: Partial<CreateSampleDto> = { name: 'Updated Name' };
      const updatedEntity: SampleEntity = { ...existingEntity, ...updateDto };

      mockTypeormRepository.findOne.mockResolvedValue(existingEntity);
      mockTypeormRepository.save.mockResolvedValue(updatedEntity);

      const result = await repository.update(1, updateDto);

      expect(result).toEqual(updatedEntity);
      expect(mockTypeormRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockTypeormRepository.save).toHaveBeenCalledWith(updatedEntity);
    });

    it('should return null when entity not found', async () => {
      mockTypeormRepository.findOne.mockResolvedValue(null);

      const result = await repository.update(999, { name: 'Updated' });

      expect(result).toBeNull();
      expect(mockTypeormRepository.findOne).toHaveBeenCalledWith({
        where: { id: 999 },
      });
      expect(mockTypeormRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should return true when entity is deleted', async () => {
      mockTypeormRepository.delete.mockResolvedValue({ affected: 1, raw: {} });

      const result = await repository.delete(1);

      expect(result).toBe(true);
      expect(mockTypeormRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should return false when entity not found', async () => {
      mockTypeormRepository.delete.mockResolvedValue({ affected: 0, raw: {} });

      const result = await repository.delete(999);

      expect(result).toBe(false);
      expect(mockTypeormRepository.delete).toHaveBeenCalledWith(999);
    });

    it('should return false when affected is null', async () => {
      mockTypeormRepository.delete.mockResolvedValue({
        affected: null,
        raw: {},
      });

      const result = await repository.delete(1);

      expect(result).toBe(false);
    });
  });
});
