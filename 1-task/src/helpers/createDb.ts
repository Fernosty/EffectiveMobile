import { DataSource, DataSourceOptions } from 'typeorm';

const createDb = async (): Promise<void> => {
    const tempDataSourceOptions: DataSourceOptions = {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        database: 'postgres',
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
    };

    const tempDataSource = new DataSource(tempDataSourceOptions);

    try {
        console.log(tempDataSourceOptions.username);
        await tempDataSource.initialize();
        const db = await tempDataSource.query("SELECT 1 FROM pg_database WHERE datname = 'task-1'");

        if (db.length === 0) {
            await tempDataSource.query('CREATE DATABASE "task-1"');
        }
    } catch (error) {
        console.error('Ошибка при создании базы:', error);
    } finally {
        await tempDataSource.destroy();
    }
};

export default createDb;
