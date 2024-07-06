import {
  Controller,
  Body,
  Param,
  Put,
  Logger,
  HttpException,
} from '@nestjs/common';
import { UsersPreferencesService } from './users-preferences.service';
import { Preferences } from '@prisma/client';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserPreferencesEntity } from './entities/user-preferences.entity';
import { UpdateUsersPreferenceDto } from './dto/update-users-preference.dto';

@ApiTags('Users Preferences')
@Controller('users-preferences')
export class UsersPreferencesController {
  constructor(
    private readonly usersPreferencesService: UsersPreferencesService,
  ) {}
  private readonly logger = new Logger(UsersPreferencesController.name);

  @Put(':id')
  @ApiOkResponse({ type: UserPreferencesEntity })
  @ApiNotFoundResponse({ description: 'Preferences not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async updatePreferences(
    @Param('id') id: string,
    @Body() data: UpdateUsersPreferenceDto,
  ): Promise<Preferences> {
    try {
      return await this.usersPreferencesService.updatePreferences(id, data);
    } catch (error) {
      this.logger.error(error);
      if (error.message === 'Preferences not found') {
        throw new HttpException(error.message, 404);
      }
      throw new HttpException('Internal server error', 500, {
        cause: new Error(),
        description: 'Some error description',
      });
    }
  }
}
