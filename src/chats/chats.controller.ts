import { Controller, Post, Body, Param, Delete, Put, NotFoundException, Get } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Chat } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ChatEntity } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';


@ApiTags('Chats')
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get(':id')
  @ApiOkResponse({ type: ChatEntity })
  async getChat(@Param('id') id: string): Promise<Chat> {
    const chat = await this.chatsService.getChat(id);
    if (!chat) {
      throw new NotFoundException(`Chat with ID ${id} not found`);
    }
    return chat;
  }

  @Get('/user/:userId')
  @ApiOkResponse({ type: [ChatEntity], isArray: true })
  async getChats(@Param('userId') userId: string): Promise<Chat[]> {
    return this.chatsService.getChats(userId);
  }

  @Post()
  @ApiCreatedResponse({ type: ChatEntity })
  async createChat(@Body() data: CreateChatDto): Promise<Chat> {
    return this.chatsService.createChat(data);
  }
  
  @Put(':id/archive')
  @ApiOkResponse({ type: ChatEntity })
  async archiveChat(@Param('id') id: string): Promise<Chat> {
    const chat = await this.chatsService.archiveChat(id);
    return chat;
  }

  @Get('/archive-all/user/:userId')
  @ApiOkResponse()
  async archiveAllChats(@Param('userId') userId: string): Promise<void> {
    this.chatsService.archiveAllChats(userId);
  }
  
  @Get('/archived/user/:userId')
  @ApiOkResponse({ type: ChatEntity, isArray: true })
  async getArchivedChats(@Param('userId') userId: string): Promise<Chat[]> {
    return this.chatsService.getArchivedChats(userId);
  }
  
  @Put(':id/unarchive')
  @ApiOkResponse({ type: ChatEntity })
  async unarchiveChat(@Param('id') id: string): Promise<Chat> {
    const chat = await this.chatsService.unarchiveChat(id);
    if (!chat) {
      throw new NotFoundException(`Chat with ID ${id} not found`);
    }
    return chat;
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteChat(@Param('id') id: string): Promise<void> {
    await this.chatsService.deleteChat(id);
  }
}
