import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProviderDto } from './create-provider.dto';

export class UpdateProviderDto extends PartialType(CreateProviderDto) {

  @ApiProperty()
  key: string;
}
