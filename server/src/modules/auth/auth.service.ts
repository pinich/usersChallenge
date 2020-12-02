import {
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string) {
        // Find user by email
        Logger.debug('Login validateUser', 'AuthService');
        const user = await this.userService.getUserByEmail(username);
        if (!user) {
            return null;
        }

        // Check the password
        const match = await this.comparePassword(pass, user.password);
        if (!match) {
            return null;
        }

        // Remove password field from user object

        const { password, ...result } = user;
        return result;
    }

    public async login(user) {
        const { token, exp } = await this.generateToken(user);
        return { user, token, exp };
    }

    public async create(user: UserDto) {
        // hash password
        const pass = await this.hashPassword(user.password);

        // Create user
        const newUserID = await this.userService.insertUser({
            ...user,
            password: pass,
        });
        if (!newUserID) {
            throw new InternalServerErrorException('Unable to create the user');
        }
        let { password, ...result } = user;
        result['id'] = newUserID + '';
        //Generate Token with (email & ID)
        const generateTokenObj = { email: user.email, id: newUserID };

        const { token, exp } = await this.generateToken(generateTokenObj);

        // return user & token
        return { user: result, token, exp: exp };
    }

    private async generateToken(user: any): Promise<{ token: string, exp: number }> {
        const { email, id, ...restData } = user;
        const token = await this.jwtService.signAsync({ email: email, id: id });
        const exp = this.jwtService.decode(token)['exp'];
        return { token, exp };
    }

    private async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

    private async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
}
