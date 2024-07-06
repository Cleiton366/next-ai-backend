import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  providers: [AuthService, UsersService, PrismaService, GoogleStrategy],
})
export class AuthModule {}
