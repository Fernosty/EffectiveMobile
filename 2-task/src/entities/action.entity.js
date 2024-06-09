const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: 'Action',
    tableName: 'actions',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        userId: {
            type: 'int',
        },
        date: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
        },
        changeType: {
            type: 'enum',
            enum: ['change', 'create'],
        },
    },
});
