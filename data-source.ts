import { join } from 'path';
import { DataSource } from 'typeorm';

const toPort = (value: string | undefined, fallback: number): number => {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const entitiesGlob = join(
  __dirname,
  'src',
  '**',
  '*.{entity,orm-entity}.{ts,js}',
);

const migrationsGlob = join(__dirname, 'src', 'migrations', '*.{ts,js}');

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_MASTER_HOST,
  port: toPort(process.env.DB_MASTER_PORT, 5432),
  username: process.env.DB_MASTER_USER,
  password: process.env.DB_MASTER_PASSWORD,
  database: process.env.DB_MASTER_NAME,
  entities: [entitiesGlob],
  migrations: [migrationsGlob],
  synchronize: process.env.DB_SYNCRONIZE === 'true',
  logging: true,
});
