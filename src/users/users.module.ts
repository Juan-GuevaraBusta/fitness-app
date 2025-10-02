import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { userEntity } from './entities/user.entity';
import { ProfileEntity } from '../profiles/entities/profile.entity';
import { RoutineEntity } from '../routines/entities/routine.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([userEntity, ProfileEntity, RoutineEntity])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
