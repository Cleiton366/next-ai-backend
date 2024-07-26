import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Message } from '@prisma/client';
import { CreateMessageDto } from './dto/create-message.dto';
import { Axios } from 'axios';
import { providers } from 'src/providers/data/providers.data';
import { UserPreferencesEntity } from 'src/users-preferences/entities/user-preferences.entity';

type apiResponse = {
  choices: {
    message: {
      content: string;
    };
    role: string;
  }[];
  model: string;
};

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) { }
  private readonly axios = new Axios();

  async createMessage(data: CreateMessageDto): Promise<Message> {
    if (!data.message) throw new Error('Message cannot be empty');
    if (data.message.length > 500) throw new Error('Message too long');
    if (data.role !== 'user') throw new Error('Invalid role');

    const chat = await this.prisma.chat.findUnique({
      where: {
        id: data.chatId,
      },
    });
    if (!chat) throw new Error('Chat not found');

    const preferences = await this.prisma.preferences.findUnique({
      where: {
        userId: chat.userId,
      },
      include: {
        apiKeys: true,
      },
    });

    if (!preferences) throw new Error('Preferences not found');

    await this.prisma.message.create({
      data,
    });

    const response = await this.handleSendMessage(data.message, preferences);

    return this.prisma.message.create({
      data: {
        message: response.choices[0].message.content,
        role: response.model,
        chatId: data.chatId,
      },
    });
  }

  async handleSendMessage(
    content: string,
    preferences: UserPreferencesEntity,
  ): Promise<apiResponse> {
    const defaultProvider = providers.find(
      (provider) => provider.id === preferences.defaultProvider,
    );
    const apiKey =
      preferences.defaultSource === 'server'
        ? process.env[preferences.defaultProvider]
        : preferences.apiKeys.find(
          (apiKey) => apiKey.name === defaultProvider.name,
        ).key;

    if (!apiKey) throw new Error('API key not found or empty');

    const res = await fetch(defaultProvider.url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: preferences.defaultModel,
        messages: [
          {
            content: content,
            role: 'user',
          },
        ],
      }),
    });

    const data: apiResponse = await res.json();

    if (!data.choices)
      throw new Error('Invalid response from provider');
    return data;
  }
}
