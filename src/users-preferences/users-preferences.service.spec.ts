import { Test, TestingModule } from '@nestjs/testing';
import { UsersPreferencesService } from './users-preferences.service';

describe('UsersPreferencesService', () => {
  let service: UsersPreferencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersPreferencesService],
    }).compile();

    service = module.get<UsersPreferencesService>(UsersPreferencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
