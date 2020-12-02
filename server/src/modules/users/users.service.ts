import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { DAL } from '../../core/DB_Knex';
import { UserSqlQueries } from './sql/queries';

@Injectable()
export class UsersService {

    private readonly knex = DAL.getKnex();

    constructor() {
        // The table creation is done asynchronously 
        (async () => {
            const res = await this.knex.raw(UserSqlQueries.buildTable);
            Logger.log(`Building users table, ${res}`, 'UsersService');
        })()
    }

    async getAllUsers(): Promise<User[]> {
        const res = await this.knex.raw(UserSqlQueries.selectAllUsers);
        Logger.log(`Getting all users`, 'UsersService');
        return res.map((userData: User) => {
            // Remove password from generated new User object
            const resUser = new User(
                userData.id,
                userData.name,
                userData.email,
                undefined,
                userData.date,
                userData.other
            );
            return resUser;
        });

    }
    async insertUser(user: UserDto): Promise<any> {
        Logger.log(`created user: ${UserDto}`, 'UsersService');

        const res: any = await this.knex('users').insert({
            name: user.name,
            email: user.email,
            password: user.password,
            other: user.other,
        });
        Logger.log(`created userID: ${res}`, 'UsersService');
        return res[0] ?? null;
    }

    /**
     * Needed for registration (Validation if email already in user)
     * @param email 
     */
    async getUserByEmail(email: string): Promise<User> {
        const res = await this.knex.raw(UserSqlQueries.selectByEmail, [
            email,
        ]);
        Logger.log(`Selecting user with email: '${email}'`, 'UsersService');
        if (!res[0]) {
            return null;
        }
        const response = { ...res[0], id: res[0].id + '' };
        return response;
    }

    /**
     * Used for JWT verification and search for user by userID
     * @param id UserID
     */
    async getUserById(id: string): Promise<User> {
        const res = await this.knex.raw(UserSqlQueries.selectById, [id]);
        Logger.log(`Selecting user with id: '${id}'`, 'UsersService');
        if (!res[0]) {
            // return null;
            throw new NotFoundException('user not found');
            
        }
        const user = new User(
            res[0].id,
            res[0].name,
            res[0].email,
            undefined,
            res[0].date,
            res[0].other,
        )
        return user;
    }
}
