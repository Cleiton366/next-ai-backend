import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ChatsModule } from './chats/chats.module';
import { UsersPreferencesModule } from './users-preferences/users-preferences.module';
import { PrismaService } from './prisma/prisma.service';
import { MessagesModule } from './messages/messages.module';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [
    UsersModule,
    ChatsModule,
    UsersPreferencesModule,
    MessagesModule,
    UsersPreferencesModule,
    ProvidersModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}