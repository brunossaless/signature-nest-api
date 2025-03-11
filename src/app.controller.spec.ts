import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './interfaces/user.interface';

describe('AppController', () => {
  let appController: AppController;

  const mockAppService = {
    getUser: jest.fn(),
    createUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    it('should return a user when credentials are valid', async () => {
      const mockUser: User = {
        id: '1',
        email: 'test@example.com',
        password: 'password123',
        created_at: new Date(),
      };

      mockAppService.getUser.mockResolvedValue(mockUser);

      const result = await appController.getUser(
        'test@example.com',
        'password123',
      );

      expect(result).toEqual(mockUser);
      expect(mockAppService.getUser).toHaveBeenCalledWith(
        'test@example.com',
        'password123',
      );
      expect(mockAppService.getUser).toHaveBeenCalledTimes(1);
    });

    it('should return null when user is not found', async () => {
      mockAppService.getUser.mockResolvedValue(null);

      const result = await appController.getUser(
        'wrong@email.com',
        'wrongpass',
      );

      expect(result).toBeNull();
      expect(mockAppService.getUser).toHaveBeenCalledWith(
        'wrong@email.com',
        'wrongpass',
      );
      expect(mockAppService.getUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const newUser: User = {
        id: '2',
        email: 'new@example.com',
        password: 'newpass123',
        created_at: new Date(),
      };

      mockAppService.createUser.mockResolvedValue(newUser);

      const result = await appController.createUser(newUser);

      expect(result).toEqual(newUser);
      expect(mockAppService.createUser).toHaveBeenCalledWith(newUser);
      expect(mockAppService.createUser).toHaveBeenCalledTimes(1);
    });
  });
});
