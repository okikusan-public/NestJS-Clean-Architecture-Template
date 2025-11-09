import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from './../src/app.module';
import { SampleOrmEntity } from '../src/infrastructure/postgres/entities/sample.orm-entity';

describe('SampleController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<SampleOrmEntity>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    repository = moduleFixture.get<Repository<SampleOrmEntity>>(
      getRepositoryToken(SampleOrmEntity),
    );
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/samples (GET)', () => {
    it('should return an array of samples', async () => {
      await repository.clear();
      await repository.save([
        repository.create({
          name: 'Test 1',
          description: 'Description 1',
        }),
        repository.create({
          name: 'Test 2',
          description: 'Description 2',
        }),
      ]);

      const response = await request(app.getHttpServer())
        .get('/samples')
        .expect(200);

      expect(response.body.data).toHaveLength(2);
      expect(response.body.data[0]).toMatchObject({
        name: 'Test 1',
        description: 'Description 1',
      });
    });
  });

  describe('/samples/:id (GET)', () => {
    it('should return a single sample', async () => {
      const saved = await repository.save(
        repository.create({
          name: 'Test',
          description: 'Description',
        }),
      );

      const response = await request(app.getHttpServer())
        .get(`/samples/${saved.id}`)
        .expect(200);

      expect(response.body.data).toMatchObject({
        id: saved.id,
        name: 'Test',
        description: 'Description',
      });
    });

    it('should return 404 when sample not found', () => {
      return request(app.getHttpServer()).get('/samples/999').expect(404);
    });
  });

  describe('/samples (POST)', () => {
    it('should create a new sample', async () => {
      const newSample = { name: 'New Sample', description: 'New Description' };

      const response = await request(app.getHttpServer())
        .post('/samples')
        .send(newSample)
        .expect(201);

      expect(response.body.data).toMatchObject(newSample);
      const created = await repository.findOne({
        where: { id: response.body.data.id },
      });
      expect(created).toBeDefined();
    });
  });

  describe('/samples/:id (PUT)', () => {
    it('should update an existing sample', async () => {
      const saved = await repository.save(
        repository.create({
          name: 'Old Name',
          description: 'Old Description',
        }),
      );

      const response = await request(app.getHttpServer())
        .put(`/samples/${saved.id}`)
        .send({ name: 'Updated Name' })
        .expect(200);

      expect(response.body.data).toMatchObject({
        id: saved.id,
        name: 'Updated Name',
      });
    });

    it('should return 404 when updating non-existent sample', () => {
      return request(app.getHttpServer())
        .put('/samples/999')
        .send({ name: 'Updated' })
        .expect(404);
    });
  });

  describe('/samples/:id (DELETE)', () => {
    it('should delete a sample', async () => {
      const saved = await repository.save(
        repository.create({
          name: 'Delete Me',
          description: 'Delete Description',
        }),
      );

      await request(app.getHttpServer())
        .delete(`/samples/${saved.id}`)
        .expect(204);

      const found = await repository.findOne({ where: { id: saved.id } });
      expect(found).toBeNull();
    });

    it('should return 404 when deleting non-existent sample', () => {
      return request(app.getHttpServer()).delete('/samples/999').expect(404);
    });
  });
});
