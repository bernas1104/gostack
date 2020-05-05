import { uuid } from 'uuidv4';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

export default class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), name, email, password });

    this.users.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findEmail = this.users.find(user => user.email === email);

    return findEmail;
  }

  public async findById(user_id: string): Promise<User | undefined> {
    const findId = this.users.find(user => user.id === user_id);

    return findId;
  }

  public async save(user: User): Promise<User> {
    const findUser = this.users.findIndex(
      userSaved => userSaved.id === user.id,
    );

    this.users[findUser] = user;

    return user;
  }
}
