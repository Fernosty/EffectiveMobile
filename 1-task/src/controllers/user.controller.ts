import { UserService } from '@/services/user.service';
import { RequestHandler } from 'express';
import { AddUserDto } from '@/dto/add-user.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { formatErrors } from '@/helpers/formatErrors';
import { UpdateUserDto } from '@/dto/update-user.dto';

export class UserController {
    private service: UserService;

    constructor() {
        this.service = new UserService();
    }

    addUser: RequestHandler = async (req, res): Promise<void> => {
        try {
            console.log(req.body);
            const addUserDto: AddUserDto = plainToInstance(AddUserDto, req.body);
            const errors = await validate(addUserDto, {
                whitelist: true,
                validationError: { target: false, value: false },
            });
            if (errors.length > 0) {
                res.status(400).send(formatErrors(errors));
                return;
            }
            const user = await this.service.addUser(addUserDto);
            res.send(user);
        } catch (e) {
            res.status(500).send({ error: { message: 'Error: ' + (e as Error).message } });
        }
    };

    patchUser: RequestHandler = async (req, res): Promise<void> => {
        try {
            const updateUserDto: UpdateUserDto = plainToInstance(UpdateUserDto, req.body);
            const errors = await validate(updateUserDto, {
                whitelist: true,
                validationError: { target: false, value: false },
            });
            if (errors.length > 0) {
                res.status(400).send(formatErrors(errors));
                return;
            }
            const user = await this.service.patchUser(Number(req.params.id), updateUserDto);
            if (!user) {
                res.status(404).send({ error: { message: 'User not found' } });
                return;
            }
            res.send(user);
        } catch (e) {
            res.status(500).send({ error: { message: `Error: ${(e as Error).message}` } });
        }
    };

    getUsers: RequestHandler = async (req, res): Promise<void> => {
        const users = await this.service.getUsers();
        res.send(users);
    };
}
