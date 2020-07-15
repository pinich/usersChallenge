import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ModuleRef, ContextIdFactory } from '@nestjs/core';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    /**
     *
     * @param authService the Auth Service
     */
    constructor(private moduleRef: ModuleRef) {
        super({ passReqToCallback: true });
    }

    /**
     *
     * @param username
     * @param pass
     */
    /*
    async validate(username: string, pass: string) {
        const user = await this.authService.validateUser(username, pass);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
    */
    async validate(request: Request, username: string, password: string) {
        const contextId = ContextIdFactory.getByRequest(request);
        const authService = await this.moduleRef.resolve(
            AuthService,
            contextId,
        );
        const user = await authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
