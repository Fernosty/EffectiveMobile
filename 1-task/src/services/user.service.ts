import { UserRepository } from '@/repositories/user.repository';
import { AddUserDto } from '@/dto/add-user.dto';
import { User } from '@/entities/user.entity';
import { UpdateUserDto } from '@/dto/update-user.dto';
import axios from 'axios';

export class UserService {
    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    addUser = async (addUserDto: AddUserDto): Promise<User> => {
        const user = await this.repository.addUser(addUserDto);
        await axios.post('http://localhost:8001/actions', { userId: user.id, changeType: 'create' });
        return user;
    };

    getUsers = async (): Promise<User[]> => {
        return await this.repository.getUsers();
    };

    patchUser = async (id: number, updateUserDto: UpdateUserDto): Promise<User | null> => {
        const user = await this.repository.patchUser(id, updateUserDto);
        if (user) {
            await axios.post('http://localhost:8001/actions', { userId: user.id, changeType: 'change' });
        }
        return user;
    };
}
