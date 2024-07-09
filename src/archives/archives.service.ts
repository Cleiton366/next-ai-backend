import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Chat } from '@prisma/client';

@Injectable()
export class ArchivesService {
  constructor(private prisma: PrismaService) {}

  async getArchivedChats(userId: string): Promise<Chat[]> {
    if (!userId) throw new Error('User Id cannot be empty');

    return await this.prisma.chat.findMany({
      where: {
        userId,
        isArchived: true,
      },
      include: {
        messages: true,
      },
    });
  }

  async archiveAllChats(userId: string): Promise<void> {
    if (!userId) throw new Error('User Id cannot be empty');

    await this.prisma.chat.updateMany({
      where: { userId },
      data: { isArchived: true },
    });
  }

  async archiveChat(id: string): Promise<void> {
    if (!id) throw new Error('Chat Id cannot be empty');

    const chat = await this.prisma.chat.findUnique({
      where: { id },
    });
    if (!chat) throw new Error('Chat not found');

    await this.prisma.chat.update({
      where: { id },
      data: { isArchived: true },
    });
  }


  async unarchiveChat(id: string): Promise<void> {
    if (!id) throw new Error('Chat Id cannot be empty');

    const chat = await this.prisma.chat.findUnique({
      where: { id },
    });
    if (!chat) throw new Error('Chat not found');

    await this.prisma.chat.update({
      where: { id },
      data: { isArchived: false },
    });
  }

  async deleteArchivedChat(id: string): Promise<void> {
    if (!id) throw new Error('Chat Id cannot be empty');

    const chat = await this.prisma.chat.findUnique({
      where: { id },
    });
    if (!chat) throw new Error('Chat not found');

    await this.prisma.$transaction([
      this.prisma.message.deleteMany({
        where: { chatId: id },
      }),
      this.prisma.chat.delete({
        where: { id },
      }),
    ]);
  }

  async deleteAllArchivedChats(userId: string): Promise<void> {
    if (!userId) throw new Error('User Id cannot be empty');

    const chats = await this.prisma.chat.findMany({
      where: { 
        userId ,
        isArchived: true,
      },
    });
    if (!chats) throw new Error('Chats not found or empty');

    await this.prisma.$transaction([
      this.prisma.message.deleteMany({
        where: { chatId: { in: chats.map((chat) => chat.id) } },
      }),
      this.prisma.chat.deleteMany({
        where: { 
          userId ,
          isArchived: true,
        },
      }),
    ]);
  }
}
