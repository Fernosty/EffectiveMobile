import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '@/entities/user.entity';

const options: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'task-1',
    synchronize: true,
    entities: [User],
    logging: true,
};

export const appDataSource = new DataSource(options);
