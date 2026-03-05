import { DataSource, DataSourceOptions } from 'typeorm';

const migrationOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5003'),
  username: process.env.DB_USERNAME || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB || 'book_rental_db',
  synchronize: false,
  logging: false,
  entities: ['./src/infrastructure/typeorm/entities/*.entity{.ts,.js}'],
  migrations: ['./db/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
};

const datasource = new DataSource(migrationOptions);

export default datasource;
