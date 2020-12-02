import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';


@Module({
    imports: [AuthModule, UsersModule],
    controllers: [AppController],
})
export class AppModule {}
