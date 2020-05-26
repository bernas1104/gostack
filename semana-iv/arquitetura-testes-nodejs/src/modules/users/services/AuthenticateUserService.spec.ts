import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;

let authenticateUserService: AuthenticateUserService;

let createUserService: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should authenticate an user', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const response = await authenticateUserService.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(response.user).toBeInstanceOf(User);
    expect(response).toHaveProperty('token');
  });

  it('should not authenticate user if he/she does not exist', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'johndoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not authenticate user if the password does not match', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateUserService.execute({
        email: 'johndoe@gmail.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
