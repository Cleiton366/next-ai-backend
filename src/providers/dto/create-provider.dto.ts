import { ApiProperty } from '@nestjs/swagger';

export class CreateProviderDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  key: string;

  @ApiProperty()
  preferencesId: string;
}
