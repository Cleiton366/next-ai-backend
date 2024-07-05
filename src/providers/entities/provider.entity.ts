import { Provider as ProviderModel } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class ProviderEntity implements ProviderModel {

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  key: string;

  @ApiProperty()
  preferencesId: string;
}
