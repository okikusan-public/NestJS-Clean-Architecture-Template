import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
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
  entities: ['/usr/src/app/dist/src/domains/**/entities/*.js'],
  migrations: ['/usr/src/app/dist/src/migrations/*.js'],
  synchronize: process.env.DB_SYNCRONIZE === 'true',
  migrationsRun: true,
  logging: true,
};

export default config;
