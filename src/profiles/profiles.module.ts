import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesService } from './services/profiles.service';
import { ProfilesController } from './controllers/profiles.controller';
import { ProfileEntity } from './entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileEntity])
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService],
  exports: [ProfilesService],
})
export class ProfilesModule {}
