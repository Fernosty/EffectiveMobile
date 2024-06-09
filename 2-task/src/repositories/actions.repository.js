const dataSource = require('../dataSource/dataSource');
const actionRepository = dataSource.getRepository('Action');

const createAction = async action => {
    if (action.userId === undefined) {
        throw new Error('userId is required');
    }

    if (action.changeType === undefined) {
        throw new Error('changeType is required');
    }
    return await actionRepository.save(action);
};

const getActions = async (page = 1, pageSize = 20) => {
    const skip = (page - 1) * pageSize;
    return await actionRepository.find({
        order: { date: 'DESC' },
        skip: skip,
        take: pageSize,
    });
};

module.exports = {
    createAction,
    getActions,
};
