import { IRoute } from '@/interfaces/IRoute.interface';
import { Router } from 'express';
import { UserController } from '@/controllers/user.controller';

export class UserRoute implements IRoute {
    public path = '/users';
    public router = Router();
    private controller: UserController;

    constructor() {
        this.controller = new UserController();
        this.init();
    }

    private init() {
        this.router.post('/', this.controller.addUser);
        this.router.get('/', this.controller.getUsers);
        this.router.patch('/:id', this.controller.patchUser);
    }
}
