import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SampleRepositoryImpl } from './sample.impl';
import { SampleEntity } from '../../domains/sample/entities/sample.entity';
import { SampleOrmEntity } from './entities/sample.orm-entity';
import { CreateSampleDto } from '../../interfaces/web/dto/create-sample.dto';

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
          provide: getRepositoryToken(SampleOrmEntity),
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
      const mockOrmEntities = [
        { id: 1, name: 'Test 1', description: 'Description 1' },
        { id: 2, name: 'Test 2', description: 'Description 2' },
      ];
      const expectedDomainEntities = mockOrmEntities.map(
        (e) => new SampleEntity(e.id, e.name, e.description),
      );
      mockTypeormRepository.find.mockResolvedValue(mockOrmEntities);

      const result = await repository.findAll();

      expect(result).toEqual(expectedDomainEntities);
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
      const mockOrmEntity = {
        id: 1,
        name: 'Test',
        description: 'Description',
      };
      const expectedDomainEntity = new SampleEntity(
        mockOrmEntity.id,
        mockOrmEntity.name,
        mockOrmEntity.description,
      );
      mockTypeormRepository.findOne.mockResolvedValue(mockOrmEntity);

      const result = await repository.findById(1);

      expect(result).toEqual(expectedDomainEntity);
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
      const mockOrmEntity = { id: 1, ...dto };
      const expectedDomainEntity = new SampleEntity(
        1,
        dto.name,
        dto.description,
      );

      mockTypeormRepository.create.mockReturnValue(mockOrmEntity);
      mockTypeormRepository.save.mockResolvedValue(mockOrmEntity);

      const result = await repository.create(dto);

      expect(result).toEqual(expectedDomainEntity);
      expect(mockTypeormRepository.create).toHaveBeenCalledWith(dto);
      expect(mockTypeormRepository.save).toHaveBeenCalledWith(mockOrmEntity);
    });
  });

  describe('update', () => {
    it('should update and return the entity when found', async () => {
      const existingOrmEntity = {
        id: 1,
        name: 'Old Name',
        description: 'Old Description',
      };
      const updateDto: Partial<CreateSampleDto> = { name: 'Updated Name' };
      const updatedOrmEntity = { ...existingOrmEntity, ...updateDto };
      const expectedDomainEntity = new SampleEntity(
        updatedOrmEntity.id,
        updatedOrmEntity.name,
        updatedOrmEntity.description,
      );

      mockTypeormRepository.findOne.mockResolvedValue(existingOrmEntity);
      mockTypeormRepository.save.mockResolvedValue(updatedOrmEntity);

      const result = await repository.update(1, updateDto);

      expect(result).toEqual(expectedDomainEntity);
      expect(mockTypeormRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockTypeormRepository.save).toHaveBeenCalledWith(updatedOrmEntity);
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
