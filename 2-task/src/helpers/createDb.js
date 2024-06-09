const { DataSource } = require('typeorm');

const createDb = async () => {
    const tempDataSourceOptions = {
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
        const db = await tempDataSource.query("SELECT 1 FROM pg_database WHERE datname = 'task-2'");

        if (db.length === 0) {
            await tempDataSource.query('CREATE DATABASE "task-2"');
        }
    } catch (error) {
        console.error('Ошибка при создании базы:', error);
    } finally {
        await tempDataSource.destroy();
    }
};

module.exports = createDb;
