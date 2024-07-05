import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Chat } from '@prisma/client';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatsService {
  constructor(private prisma: PrismaService) {}
  
  async getChat(id: string): Promise<Chat> {
    return this.prisma.chat.findUnique({
      where: { id },
      include: {
        messages: true,
      },
    });
  }
  
  async getChats(id: string): Promise<Chat[]> {
    return this.prisma.chat.findMany({
      where: {
        userId: id
      },
      include: {
        messages: true,
      },
    });
  }
  
  async createChat(data: CreateChatDto): Promise<Chat> {
    return this.prisma.chat.create({
      data,
      include: {
        messages: true,
      },
    });
  }
  
  async archiveChat(id: string): Promise<Chat> {
    return this.prisma.chat.update({
      where: { id },
      data: { isArchived: true },
    });
  }
  
  async archiveAllChats(userId: string): Promise<void> {
    this.prisma.chat.updateMany({
      where: { userId },
      data: { isArchived: true },
    });
  }

  async getArchivedChats(userId: string): Promise<Chat[]> {
    return this.prisma.chat.findMany({
      where: {
        userId,
        isArchived: true,
      },
      include: {
        messages: true,
      },
    });
  }
  
  async unarchiveChat(id: string): Promise<Chat> {
    return this.prisma.chat.update({
      where: { id },
      data: { isArchived: false },
    });
  }

  async deleteChat(id: string): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.message.deleteMany({
        where: { chatId: id },
      }),
      this.prisma.chat.delete({
        where: { id },
      }),
    ]);
  }
}