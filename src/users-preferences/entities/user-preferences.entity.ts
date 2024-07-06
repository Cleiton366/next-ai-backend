import { ApiProperty } from "@nestjs/swagger";
import { Preferences, Provider } from "@prisma/client";

export class UserPreferencesEntity implements Preferences {

  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  defaultProvider: string;

  @ApiProperty()
  defaultModel: string;

  @ApiProperty()
  apiKeys: Provider[];
}