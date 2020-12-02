import { Injectable, Inject, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { DAL } from '../../core/DB_Knex';
import { UserSqlQueries } from './sql/queries';
// import { UtilsBL } from '../../core/utils/utilsBL';

@Injectable()
export class UsersService {

    private readonly knex = DAL.getKnex();

    constructor() {
        this.createTable();
    }

    private async createTable() {
        // Create User table
        const res = await this.knex.raw(UserSqlQueries.buildTable);
        Logger.log(`Building users table, ${res}`, 'UserService');
    }

    async insertUser(user: UserDto): Promise<User> {
        Logger.log(`created user: ${UserDto}`, 'UserService');
        // await UtilsBL.classValidate(UserDto, user);

        const res: any = await this.knex('users').insert({
            name: user.name,
            email: user.email,
            password: user.password,
            other: user.other,
        });
        Logger.log(`created userID: ${res}`, 'UserService');
        return res[0] ?? null;
    }

    async findOneByEmail(email: string): Promise<User> {
        const res = await this.knex.raw(UserSqlQueries.selectByEmail, [
            email,
        ]);
        Logger.log(`Selecting user with email: '${email}'`, 'UserService');
        if (!res[0]) {
            return null;
        }
        const response = { ...res[0], id: res[0].id + '' };
        return response;
    }

    async findOneById(id: string): Promise<User> {
        const res = await this.knex.raw(UserSqlQueries.selectById, [id]);
        Logger.log(`Selecting user with id: '${id}'`, 'UserService');
        if (!res[0]) {
            return null;
        }
        const response = { ...res[0], id: res[0].id + '' };
        return response;
    }
}
