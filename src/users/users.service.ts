import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }
  private readonly logger = new Logger(UsersService.name);

  async getUserById(id: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
        include: {
          chats: true,
          preferences: true
        }
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async createUser(data: CreateUserDto): Promise<User> {
    try {
      await this.prisma.user.create({
        data,
      });
      await this.prisma.preferences.create({
        data: {
          userId: data.id,
        }
      });

      return await this.prisma.user.findUnique({
        where: { id: data.id },
        include: {
          preferences: true
        }
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const chats = await this.prisma.chat.findMany({
        where: { userId: id },
      });

      chats.map(async (chat) => {
        await this.prisma.$transaction([
          this.prisma.message.deleteMany({
            where: { chatId: chat.id },
          }),
          this.prisma.chat.delete({
            where: { id: chat.id },
          }),
        ]);
      });

      await this.prisma.$transaction([
        this.prisma.preferences.delete({
          where: { userId: id },
        }),
        this.prisma.user.delete({
          where: { id },
        })
      ]);
    }
    catch (error) {
      this.logger.error(error);
    }
  }

}
