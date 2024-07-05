import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUsersPreferenceDto } from './create-users-preference.dto';

export class UpdateUsersPreferenceDto extends PartialType(CreateUsersPreferenceDto) {
  
  @ApiProperty()
  defaultProvider: string;

  @ApiProperty()
  defaultModel: string;
}
