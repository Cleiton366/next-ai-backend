import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersPreferencesService } from './users-preferences.service';
import { CreateUsersPreferenceDto } from './dto/create-users-preference.dto';
import { UpdateUsersPreferenceDto } from './dto/update-users-preference.dto';

@Controller('users-preferences')
export class UsersPreferencesController {
  constructor(private readonly usersPreferencesService: UsersPreferencesService) {}

  @Post()
  create(@Body() createUsersPreferenceDto: CreateUsersPreferenceDto) {
    return this.usersPreferencesService.create(createUsersPreferenceDto);
  }

  @Get()
  findAll() {
    return this.usersPreferencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersPreferencesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersPreferenceDto: UpdateUsersPreferenceDto) {
    return this.usersPreferencesService.update(+id, updateUsersPreferenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersPreferencesService.remove(+id);
  }
}
