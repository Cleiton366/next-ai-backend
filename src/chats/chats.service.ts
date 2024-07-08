import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Chat } from '@prisma/client';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatsService {
  constructor(private prisma: PrismaService) { }

  async getChat(id: string): Promise<Chat> {
    if (!id) throw new Error('Chat Id cannot be empty');
    const chat = await this.prisma.chat.findUnique({
      where: { id },
      include: {
        messages: true,
      },
    });
    if (!chat) throw new Error('Chat not found');
    return chat;
  }

  async getChats(id: string): Promise<Chat[]> {
    if (!id) throw new Error('User Id cannot be empty');
    return await this.prisma.chat.findMany({
      where: {
        userId: id,
        isArchived: false,
      },
      include: {
        messages: true,
      },
    });
  }

  async createChat(data: CreateChatDto): Promise<Chat> {
    if (!data.userId) throw new Error('User Id cannot be empty');
    if (!data.name) throw new Error('Chat name cannot be empty');

    return await this.prisma.chat.create({
      data,
      include: {
        messages: true,
      },
    });
  }

  async renameChat(id: string, data: UpdateChatDto): Promise<Chat> {
    if (!id) throw new Error('Chat Id cannot be empty');
    if (!data.name) throw new Error('Chat name cannot be empty');

    return await this.prisma.chat.update({
      where: { id },
      data,
      include: {
        messages: true,
      },
    });
  }

  async deleteChat(id: string): Promise<void> {
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
}
