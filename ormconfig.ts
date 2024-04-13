import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/src/domains/**/entities/*.js'],
  migrations: ['dist/src/infrastructure/typeorm/migrations/*.js'],
  subscribers: ['dist/src/infrastructure/typeorm/subscribers/*.js'],
  synchronize: false,
  migrationsRun: true,
  logging: false,
};

export default config;