import { ApiProperty } from "@nestjs/swagger";
import { Message } from "@prisma/client";

export class MessageEntity implements Message {
  
  @ApiProperty()
  id: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  timestamp: Date;

  @ApiProperty()
  chatId: string;
}