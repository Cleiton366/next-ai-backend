import { Module } from '@nestjs/common';
import { UsersPreferencesService } from './users-preferences.service';
import { UsersPreferencesController } from './users-preferences.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UsersPreferencesController],
  providers: [UsersPreferencesService, PrismaService],
})
export class UsersPreferencesModule {}
