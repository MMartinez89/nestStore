//Sistema de comando y sistema de migraciones
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export const AddDataSource = new DataSource({
  type: 'postgres',
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
  host: process.env.POSTGRES_HOST,
  synchronize: false,
  logging: false,
  entities: ['dist/**/*.entity{.js,.ts}'],
  migrations: ['dist/database/migrations/*{.js,.ts}'],
  migrationsTableName: 'migrations',
});
