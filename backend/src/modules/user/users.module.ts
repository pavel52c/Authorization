import { Module } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './services/users.service';
import { UsersController } from './controllres/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
