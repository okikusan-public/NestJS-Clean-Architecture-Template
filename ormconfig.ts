import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['/usr/src/app/dist/src/domains/**/entities/*.js'],
  migrations: ['/usr/src/app/dist/src/infrastructure/typeorm/migrations/*.js'],
  subscribers: ['/usr/src/app/dist/src/infrastructure/typeorm/subscribers/*.js'],
  synchronize: Boolean(process.env.DB_SYNCRONIZE),
  migrationsRun: true,
  logging: true,
};

export default config;