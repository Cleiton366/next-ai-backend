import { Module } from '@nestjs/common';
import { UsersPreferencesService } from './users-preferences.service';
import { UsersPreferencesController } from './users-preferences.controller';

@Module({
  controllers: [UsersPreferencesController],
  providers: [UsersPreferencesService],
})
export class UsersPreferencesModule {}
