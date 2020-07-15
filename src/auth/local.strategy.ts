import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    /**
     *
     * @param authService the Auth Service
     */
    constructor(private authService: AuthService) {
        super();
    }

    /**
     *
     * @param username
     * @param pass
     */
    async validate(username: string, pass: string) {
        const user = await this.authService.validateUser(username, pass);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
