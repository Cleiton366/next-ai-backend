import { Injectable } from '@nestjs/common';
import { CreateUsersPreferenceDto } from './dto/create-users-preference.dto';
import { UpdateUsersPreferenceDto } from './dto/update-users-preference.dto';

@Injectable()
export class UsersPreferencesService {
  create(createUsersPreferenceDto: CreateUsersPreferenceDto) {
    return 'This action adds a new usersPreference';
  }

  findAll() {
    return `This action returns all usersPreferences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersPreference`;
  }

  update(id: number, updateUsersPreferenceDto: UpdateUsersPreferenceDto) {
    return `This action updates a #${id} usersPreference`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersPreference`;
  }
}
