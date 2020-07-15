import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor() {
        this.users = [
            {
                userId: 1,
                username: '1',
                password: '1',
            },
            {
                userId: 2,
                username: '2',
                password: '2',
            },
            {
                userId: 3,
                username: '3',
                password: '3',
            },
        ];
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
