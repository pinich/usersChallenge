import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { Observable } from 'rxjs';

@Injectable()
export class DoesUserExist implements CanActivate {
    constructor(private readonly userService: UsersService) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request: { body: { email: string } }): Promise<boolean> {
        const userExists = await this.userService.findOneByEmail(
            request.body.email,
        );
        if (userExists) {
            throw new ForbiddenException('This email already exist');
        }
        return true;
    }
}
