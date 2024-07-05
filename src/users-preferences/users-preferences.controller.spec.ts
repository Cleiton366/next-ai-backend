import { Test, TestingModule } from '@nestjs/testing';
import { UsersPreferencesController } from './users-preferences.controller';
import { UsersPreferencesService } from './users-preferences.service';

describe('UsersPreferencesController', () => {
  let controller: UsersPreferencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersPreferencesController],
      providers: [UsersPreferencesService],
    }).compile();

    controller = module.get<UsersPreferencesController>(UsersPreferencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
