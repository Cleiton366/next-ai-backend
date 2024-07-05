import { Controller, Body, Param, Put } from '@nestjs/common';
import { UsersPreferencesService } from './users-preferences.service';
import { Preferences } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserPreferencesEntity } from './entities/user-preferences.entity';
import { UpdateUsersPreferenceDto } from './dto/update-users-preference.dto';

@ApiTags('Users Preferences')
@Controller('users-preferences')
export class UsersPreferencesController {
  constructor(private readonly usersPreferencesService: UsersPreferencesService) {}

  @Put(':id')
  @ApiOkResponse({ type: UserPreferencesEntity })
  async updatePreferences(
    @Param('id') id: string,
    @Body() data: UpdateUsersPreferenceDto,
  ): Promise<Preferences> {
    return this.usersPreferencesService.updatePreferences(id, data);
  }
}
