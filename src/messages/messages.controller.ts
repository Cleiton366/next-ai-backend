import { Controller, Post, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { MessageEntity } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @ApiCreatedResponse({ type: MessageEntity })
  async createMessage(@Body() data: CreateMessageDto): Promise<Message> {
    return this.messagesService.createMessage(data);
  }
}
