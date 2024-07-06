import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Get,
  Logger,
  HttpException,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Chat } from '@prisma/client';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ChatEntity } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';

@ApiTags('Chats')
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}
  private readonly logger = new Logger(ChatsController.name);

  @Get(':id')
  @ApiOkResponse({ type: ChatEntity })
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  @ApiNotFoundResponse({ description: 'Chat not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getChat(@Param('id') id: string): Promise<Chat> {
    try {
      return await this.chatsService.getChat(id);
    } catch (error) {
      this.logger.error(error);
      if (error.message === 'Chat Id cannot be empty')
        throw new HttpException(error.message, 400);
      if (error.message === 'Chat not found')
        throw new HttpException(error.message, 404);
      throw new HttpException('Internal server error', 500, {
        cause: new Error(),
      });
    }
  }

  @Get('/user/:userId')
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  @ApiOkResponse({ type: [ChatEntity], isArray: true })
  async getChats(@Param('userId') userId: string): Promise<Chat[]> {
    try {
      return await this.chatsService.getChats(userId);
    } catch (error) {
      this.logger.error(error);
      if (error.message === 'User Id cannot be empty')
        throw new HttpException(error.message, 400);
      throw new HttpException('Internal server error', 500, {
        cause: new Error(),
      });
    }
  }

  @Post()
  @ApiCreatedResponse({ type: ChatEntity })
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async createChat(@Body() data: CreateChatDto): Promise<Chat> {
    try {
      return await this.chatsService.createChat(data);
    } catch (error) {
      this.logger.error(error);
      if (error.message === 'User Id cannot be empty')
        throw new HttpException(error.message, 400);
    }
  }

  @Put(':id/archive')
  @ApiOkResponse({ type: ChatEntity })
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  async archiveChat(@Param('id') id: string): Promise<Chat> {
    try {
      return await this.chatsService.archiveChat(id);
    } catch (error) {
      this.logger.error(error);
      if (error.message === 'Chat Id cannot be empty')
        throw new HttpException(error.message, 400);
      if (error.message === 'Chat not found')
        throw new HttpException(error.message, 404);
      throw new HttpException('Internal server error', 500, {
        cause: new Error(),
      });
    }
  }

  @Get('/archive-all/user/:userId')
  @ApiOkResponse()
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async archiveAllChats(@Param('userId') userId: string): Promise<void> {
    try {
      await this.chatsService.archiveAllChats(userId);
    } catch (error) {
      this.logger.error(error);
      if (error.message === 'User Id cannot be empty')
        throw new HttpException(error.message, 400);
      throw new HttpException('Internal server error', 500, {
        cause: new Error(),
      });
    }
  }

  @Get('/archived/user/:userId')
  @ApiOkResponse({ type: ChatEntity, isArray: true })
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getArchivedChats(@Param('userId') userId: string): Promise<Chat[]> {
    try {
      return await this.chatsService.getArchivedChats(userId);
    } catch (error) {
      this.logger.error(error);
      if (error.message === 'User Id cannot be empty')
        throw new HttpException(error.message, 400);
      throw new HttpException('Internal server error', 500, {
        cause: new Error(),
      });
    }
  }

  @Put(':id/unarchive')
  @ApiOkResponse({ type: ChatEntity })
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async unarchiveChat(@Param('id') id: string): Promise<void> {
    try {
      await this.chatsService.unarchiveChat(id);
    } catch (error) {
      this.logger.error(error);
      if (error.message === 'Chat Id cannot be empty')
        throw new HttpException(error.message, 400);
      throw new HttpException('Internal server error', 500, {
        cause: new Error(),
      });
    }
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  @ApiNotFoundResponse({ description: 'Chat not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async deleteChat(@Param('id') id: string): Promise<void> {
    try {
      await this.chatsService.deleteChat(id);
    } catch (error) {
      this.logger.error(error);
      if (error.message === 'Chat Id cannot be empty')
        throw new HttpException(error.message, 400);
      if (error.message === 'Chat not found')
        throw new HttpException(error.message, 404);
      throw new HttpException('Internal server error', 500, {
        cause: new Error(),
      });
    }
  }
}
