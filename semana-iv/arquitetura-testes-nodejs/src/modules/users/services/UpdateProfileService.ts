import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found');

    const checkEmail = await this.usersRepository.findByEmail(email);

    if (checkEmail && checkEmail.id !== user.id)
      throw new AppError('E-mail is already in used');

    user.name = name;
    user.email = email;

    if (password && !old_password)
      throw new AppError(
        'You need to inform the old password to set a new password',
      );

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) throw new AppError('Old password does not match');

      user.password = await this.hashProvider.generateHash(password, 8);
    }

    return this.usersRepository.save(user);
  }
}
