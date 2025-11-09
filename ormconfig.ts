import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

const isTestEnv = process.env.NODE_ENV === 'test';

const entitiesGlob = join(
  __dirname,
  'src',
  '**',
  '*.{entity,orm-entity}.{ts,js}',
);

const migrationsGlob = join(
  __dirname,
  'src',
  'migrations',
  '*.{ts,js}',
);

const config: TypeOrmModuleOptions = isTestEnv
  ? {
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [entitiesGlob],
      synchronize: true,
      logging: false,
    }
  : {
      type: 'postgres',
      replication: {
        master: {
          host: process.env.DB_MASTER_HOST,
          port: parseInt(process.env.DB_MASTER_PORT, 10),
          username: process.env.DB_MASTER_USER,
          password: process.env.DB_MASTER_PASSWORD,
          database: process.env.DB_MASTER_NAME,
        },
        slaves: [
          {
            host: process.env.DB_SLAVE_HOST,
            port: parseInt(process.env.DB_SLAVE_PORT, 10),
            username: process.env.DB_SLAVE_USER,
            password: process.env.DB_SLAVE_PASSWORD,
            database: process.env.DB_SLAVE_NAME,
          },
        ],
      },
      entities: [entitiesGlob],
      migrations: [migrationsGlob],
      synchronize: process.env.DB_SYNCRONIZE === 'true',
      migrationsRun: true,
      logging: true,
    };

export default config;
