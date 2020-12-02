import { Controller, Get, UseGuards, Request, Post } from '@nestjs/common';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { AuthUser } from './modules/users/user.decorator';

@Controller()
export class AppController {
    constructor() { }

    /**
     * Simple Get request to make sure the api is accessible
     */
    @Get('')
    testURL() {
        return {
            message: `Test url current time: ${(new Date()).toISOString()}`,
        };
    }

    /**
     * Protected API url, requires JWT
     */
    @UseGuards(JwtAuthGuard)
    @Get('protected')
    protectedUrl(@AuthUser() user: any) {
        return { userID: user.id }
    }

}
