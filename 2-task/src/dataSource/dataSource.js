const createDb = require('../helpers/createDb');
const typeorm = require('typeorm');

(async function () {
    await createDb();
})();

const dataSource = new typeorm.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    logging: true,
    database: 'task-2',
    synchronize: true,
    entities: [require('../entities/action.entity')],
});

module.exports = dataSource;
