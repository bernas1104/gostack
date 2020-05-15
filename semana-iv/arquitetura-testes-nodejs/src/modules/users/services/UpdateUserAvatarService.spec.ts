import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;

let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it("should create the user's avatar", async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const newAvatar = await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(newAvatar).toBeInstanceOf(User);
    expect(newAvatar.avatar).toBe('avatar.jpg');
  });

  it("should update the user's avatar", async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    let user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    user = await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'old_avatar.jpg',
    });

    const updateAvatar = await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'new_avatar.jpg',
    });

    expect(updateAvatar).toBeInstanceOf(User);
    expect(updateAvatar.avatar).toBe('new_avatar.jpg');
    expect(deleteFile).toHaveBeenCalledWith('old_avatar.jpg');
  });

  it("should not update user's avatar, if user does not exist", async () => {
    await expect(
      updateUserAvatarService.execute({
        user_id: '123456',
        avatarFilename: 'new_avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
