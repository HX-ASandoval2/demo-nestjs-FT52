import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserDbService } from './user-db.service';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const mockUsersService: Partial<UserDbService> = {
      findByEmail: () => Promise.resolve(undefined),
      create: (user: Partial<User>): Promise<User> =>
        Promise.resolve({
          ...user,
          isAdmin: false,
          id: '18b2bb94-7b3e-40a4-904d-b68a524e1ce8',
        } as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        { provide: UserDbService, useValue: mockUsersService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Create an instance of AuthService', async () => {
    expect(authService).toBeDefined();
  });

  const mockUser: Partial<User> = {
    name: 'Pepita',
    createdAt: '23/08/2024',
    password: 'pepi1234',
    email: 'pepi@mail.com',
  };

  it('signUp() creates a new user with an encript password', async () => {
    const user = await authService.signUp(mockUser as User);

    // console.log(user);

    expect(user).toBeDefined();
    expect(user.password).not.toEqual(mockUser.password);
  });
});
