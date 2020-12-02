import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWTKEY,
        });
    }

    async validate(payload: any) {
        // check if user token exists
        const payLoadChanged = { ...payload, id: payload.id + '' };
        const user = await this.userService.findOneById(payLoadChanged.id);
        if (!user) {
            throw new UnauthorizedException(
                'You are not authorized to perform the operation',
            );
        }
        return payLoadChanged;
    }
}
