import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ChatsModule } from './chats/chats.module';
import { UsersPreferencesModule } from './users-preferences/users-preferences.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    UsersModule,
    ChatsModule,
    UsersPreferencesModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}