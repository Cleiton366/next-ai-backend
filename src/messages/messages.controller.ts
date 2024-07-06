import { Controller, Post, Body, Logger, HttpException } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from '@prisma/client';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { MessageEntity } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
  private readonly logger = new Logger(MessagesController.name);
  
  @Post()
  @ApiCreatedResponse({ type: MessageEntity })
  @ApiNotFoundResponse({ description: 'Chat not found' })
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async createMessage(@Body() data: CreateMessageDto): Promise<Message> {
    try {
      return await this.messagesService.createMessage(data);
    } catch (error) {
      this.logger.error(error);
      if (error.message === 'Chat not found') throw new HttpException(error.message, 404);
      if (error.message === 'Invalid role') throw new HttpException(error.message, 400);
      if (error.message === 'Message too long') throw new HttpException(error.message, 400);
      if (error.message === 'Message cannot be empty') throw new HttpException(error.message, 400);
      throw new HttpException('Internal server error', 500, { cause: new Error()});
    }
  }
}
