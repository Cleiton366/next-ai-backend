import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersPreferenceDto } from './create-users-preference.dto';

export class UpdateUsersPreferenceDto extends PartialType(CreateUsersPreferenceDto) {}
