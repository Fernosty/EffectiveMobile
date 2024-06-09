import express from 'express';
import { Application } from 'express';
import { AppInit } from '@/interfaces/AppInit.interface';
import { IRoute } from '@/interfaces/IRoute.interface';
import { appDataSource } from '@/dataSource/dataSource';
import createDb from '@/helpers/createDb';
import dotenv from 'dotenv';

dotenv.config();

class App {
    public app: Application;
    public port: number;

    constructor(appInit: AppInit) {
        this.app = express();
        this.port = appInit.port;

        // this.initMiddlewares(appInit.middlewares);
        this.initAssets();
        this.initRoutes(appInit.controllers);
    }

    // private initMiddlewares(middlewares: RequestHandler[]) {
    //     middlewares.forEach(item => {
    //         this.app.use(item);
    //     });
    // }

    private initRoutes(routes: IRoute[]) {
        routes.forEach(item => {
            this.app.use(item.path, item.router);
        });
    }

    private initAssets() {
        this.app.use(express.json());
    }

    public async listen() {
        await createDb();
        await appDataSource.initialize();
        this.app.listen(this.port, () => {
            console.log(`App started on the http://localhost:${this.port}`);
            process.on('exit', () => {
                appDataSource.destroy();
            });
        });
    }
}

export default App;
