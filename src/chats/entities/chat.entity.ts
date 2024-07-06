import { ApiProperty } from '@nestjs/swagger';
import { Chat, Message } from '@prisma/client';

export class ChatEntity implements Chat {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  isArchived: boolean;

  @ApiProperty()
  messages: Message[];
}
