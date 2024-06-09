import App from './app';
import cors from 'cors';
import { UserRoute } from '@/routes/user.route';

const app = new App({
    port: 8000,
    middlewares: [cors()],
    controllers: [new UserRoute()],
});

app.listen();
