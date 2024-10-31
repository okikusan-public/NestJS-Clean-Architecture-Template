import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['/usr/src/app/dist/src/domains/**/entities/*.js'],
  migrations: ['/usr/src/app/dist/src/infrastructure/typeorm/migrations/*.js'],
  subscribers: ['/usr/src/app/dist/src/infrastructure/typeorm/subscribers/*.js'],
  synchronize: process.env.DB_SYNCRONIZE === 'true',
  migrationsRun: true,
  logging: true,
};


export default config;