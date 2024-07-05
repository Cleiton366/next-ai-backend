import { ApiProperty } from "@nestjs/swagger";
import { Chat, Preferences, User } from "@prisma/client";

export class UserEntity implements User {

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  profilePicture: string;

  @ApiProperty()
  preferencesId: string;

  @ApiProperty()
  chats: Chat[];

  @ApiProperty()
  preferences: Preferences;
}