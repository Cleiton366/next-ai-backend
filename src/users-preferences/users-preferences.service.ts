import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Preferences } from '@prisma/client';
import { UpdateUsersPreferenceDto } from './dto/update-users-preference.dto';

@Injectable()
export class UsersPreferencesService {
  constructor(private prisma: PrismaService) {}
  
  async updatePreferences(id: string, data: UpdateUsersPreferenceDto): Promise<Preferences> {
    return this.prisma.preferences.update({
      where: { id },
      data,
    });
  }
}
