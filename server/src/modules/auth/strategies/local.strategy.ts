import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({ usernameField: 'email' });
    }

    async validate(username: string, password: string): Promise<any> {
        Logger.debug(`Validating user: ${username}`, 'PassportStrategy');
        const user = await this.authService.validateUser(username, password);

        if (!user) {
            throw new UnauthorizedException('Invalid user credentials');
        }
        return user;
    }
}
