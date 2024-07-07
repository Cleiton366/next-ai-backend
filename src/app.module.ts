import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ChatsModule } from './chats/chats.module';
import { UsersPreferencesModule } from './users-preferences/users-preferences.module';
import { PrismaService } from './prisma/prisma.service';
import { MessagesModule } from './messages/messages.module';
import { ProvidersModule } from './providers/providers.module';
import { AuthModule } from './auth/auth.module';
import { ArchivesModule } from './archives/archives.module';

@Module({
  imports: [
    UsersModule,
    ChatsModule,
    UsersPreferencesModule,
    MessagesModule,
    UsersPreferencesModule,
    ProvidersModule,
    AuthModule,
    ArchivesModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
