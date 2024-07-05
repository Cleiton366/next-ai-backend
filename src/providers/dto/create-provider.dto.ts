import { ApiProperty } from "@nestjs/swagger";
import { Provider } from "@prisma/client";

export class CreateProviderDto implements Provider {
  
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
  
  @ApiProperty()
  key: string;

  @ApiProperty()
  preferencesId: string;
}
