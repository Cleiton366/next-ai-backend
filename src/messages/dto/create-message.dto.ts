import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty()
  role: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  chatId: string;
}
