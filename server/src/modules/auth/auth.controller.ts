import {
    Controller,
    Body,
    Post,
    UseGuards,
    Request,
    Logger,
    BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { UserDto } from '../users/dto/user.dto';
import { DoesUserExist } from './guards/doesUserExist.guard';

@Controller('auth')
export class AuthController {
    /**
     *
     */
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        Logger.debug('Login', 'AuthController');
        return await this.authService.login(req.user);
    }

    @UseGuards(DoesUserExist)
    @Post('register')
    async register(@Body() user: UserDto) {
        Logger.debug('Register', 'AuthController');
        return await this.authService.create(user);
    }
}
