import { Repository } from 'typeorm';
import { User } from '@/entities/user.entity';
import { appDataSource } from '@/dataSource/dataSource';
import { AddUserDto } from '@/dto/add-user.dto';
import { UpdateUserDto } from '@/dto/update-user.dto';

export class UserRepository extends Repository<User> {
    constructor() {
        super(User, appDataSource.createEntityManager());
    }

    async addUser(registerUserDto: AddUserDto): Promise<User> {
        const userData = this.create(registerUserDto);
        return await this.save(userData);
    }

    async getUsers(): Promise<User[]> {
        return await this.find();
    }

    async getUserById(id: number): Promise<User | null> {
        return await this.findOneBy({ id });
    }

    async patchUser(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
        const user = await this.getUserById(id);

        if (!user) {
            return null;
        }
        Object.assign(user, updateUserDto);
        return await this.save(user);
    }
}
