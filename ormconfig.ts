import { DataSource } from 'typeorm';

const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['src/domains/**/entities/*.ts'],
    migrations: ['src/infrastructure/typeorm/migrations/*.ts'],
    subscribers: ['src/infrastructure/typeorm/subscribers/*.ts'],
    synchronize: false,
    logging: false,
});

export default dataSource;
