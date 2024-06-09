import { UserRepository } from '@/repositories/user.repository';
import { AddUserDto } from '@/dto/add-user.dto';
import { User } from '@/entities/user.entity';
import { UpdateUserDto } from '@/dto/update-user.dto';

export class UserService {
    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    addUser = async (addUserDto: AddUserDto): Promise<User> => {
        return await this.repository.addUser(addUserDto);
    };

    getUsers = async (): Promise<User[]> => {
        return await this.repository.getUsers();
    };

    patchUser = async (id: number, updateUserDto: UpdateUserDto): Promise<User | null> => {
        return await this.repository.patchUser(id, updateUserDto);
    };
}
