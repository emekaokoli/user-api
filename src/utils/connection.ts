import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'master',
  database: 'postgres',
  entities: ['src/entity/*.ts'],
  synchronize: true,
});
