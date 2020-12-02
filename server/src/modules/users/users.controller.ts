import {
    Controller,
    Body,
    Post,
    UseGuards,
    Request,
    Logger,
    BadRequestException,
    Get,
    Param,
} from '@nestjs/common';

import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersSrv: UsersService) { }

    @Get('')
    async getAllUsers(){
        Logger.debug('Get all users','UsersCTRL');
        return await this.usersSrv.getAllUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id){
        Logger.debug('Get all users','UsersCTRL');
        return await this.usersSrv.getUserById(id);
    }
}