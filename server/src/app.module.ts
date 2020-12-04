import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';


@Module({
    imports: [
        AuthModule, 
        UsersModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, process.env.CLIENT_PATH),
        })
    ],
    controllers: [AppController],
})
export class AppModule {}
