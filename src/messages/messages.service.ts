import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Message } from '@prisma/client';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async createMessage(data: CreateMessageDto): Promise<Message> {
    if (!data.message) throw new Error('Message cannot be empty');
    if (data.message.length > 500) throw new Error('Message too long');
    if (data.role !== 'user' && data.role !== 'admin')
      throw new Error('Invalid role');

    const chat = await this.prisma.chat.findUnique({
      where: {
        id: data.chatId,
      },
    });
    if (!chat) throw new Error('Chat not found');
    return await this.prisma.message.create({
      data,
    });
  }
}
