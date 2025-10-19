import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SampleEntity } from '../src/domains/sample/entities/sample.entity';

describe('SampleController (e2e)', () => {
  let app: INestApplication;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(SampleEntity))
      .useValue(mockRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
    jest.clearAllMocks();
  });

  describe('/samples (GET)', () => {
    it('should return an array of samples', () => {
      const mockSamples = [
        { id: 1, name: 'Test 1', description: 'Description 1' },
        { id: 2, name: 'Test 2', description: 'Description 2' },
      ];
      mockRepository.find.mockResolvedValue(mockSamples);

      return request(app.getHttpServer())
        .get('/samples')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveLength(2);
          expect(res.body.data[0].name).toBe('Test 1');
        });
    });
  });

  describe('/samples/:id (GET)', () => {
    it('should return a single sample', () => {
      const mockSample = { id: 1, name: 'Test', description: 'Description' };
      mockRepository.findOne.mockResolvedValue(mockSample);

      return request(app.getHttpServer())
        .get('/samples/1')
        .expect(200)
        .expect((res) => {
          expect(res.body.data.id).toBe(1);
          expect(res.body.data.name).toBe('Test');
        });
    });

    it('should return 404 when sample not found', () => {
      mockRepository.findOne.mockResolvedValue(null);

      return request(app.getHttpServer()).get('/samples/999').expect(404);
    });
  });

  describe('/samples (POST)', () => {
    it('should create a new sample', () => {
      const newSample = { name: 'New Sample', description: 'New Description' };
      const createdSample = { id: 1, ...newSample };

      mockRepository.create.mockReturnValue(createdSample);
      mockRepository.save.mockResolvedValue(createdSample);

      return request(app.getHttpServer())
        .post('/samples')
        .send(newSample)
        .expect(201)
        .expect((res) => {
          expect(res.body.data.name).toBe('New Sample');
          expect(res.body.data.description).toBe('New Description');
        });
    });
  });

  describe('/samples/:id (PUT)', () => {
    it('should update an existing sample', () => {
      const existingSample = {
        id: 1,
        name: 'Old Name',
        description: 'Old Description',
      };
      const updateData = { name: 'Updated Name' };
      const updatedSample = { ...existingSample, ...updateData };

      mockRepository.findOne.mockResolvedValue(existingSample);
      mockRepository.save.mockResolvedValue(updatedSample);

      return request(app.getHttpServer())
        .put('/samples/1')
        .send(updateData)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.name).toBe('Updated Name');
        });
    });

    it('should return 404 when updating non-existent sample', () => {
      mockRepository.findOne.mockResolvedValue(null);

      return request(app.getHttpServer())
        .put('/samples/999')
        .send({ name: 'Updated' })
        .expect(404);
    });
  });

  describe('/samples/:id (DELETE)', () => {
    it('should delete a sample', () => {
      mockRepository.delete.mockResolvedValue({ affected: 1, raw: {} });

      return request(app.getHttpServer()).delete('/samples/1').expect(204);
    });

    it('should return 404 when deleting non-existent sample', () => {
      mockRepository.delete.mockResolvedValue({ affected: 0, raw: {} });

      return request(app.getHttpServer()).delete('/samples/999').expect(404);
    });
  });
});
