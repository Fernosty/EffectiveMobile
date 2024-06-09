const dataSource = require('./dataSource/dataSource');
const { createAction, getActions } = require('./repositories/actions.repository');
const express = require('express');
const app = express();

dataSource.initialize();

app.use(express.json());

app.post('/actions', async (req, res) => {
    try {
        const userId = req.body.userId;
        const changeType = req.body.changeType;
        const action = await createAction({ userId, changeType });
        res.status(201).json(action);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/actions', async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20;
        const actions = await getActions(page, pageSize);
        res.json(actions);
    } catch (error) {
        console.error('Error fetching actions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = 8001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
