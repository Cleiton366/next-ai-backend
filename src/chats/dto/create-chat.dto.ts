import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  userId: string;
}
