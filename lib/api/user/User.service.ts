import { JSONObject } from 'kuzzle';
import { Blanning } from '../../core/Blanning';
import { User } from './User.type';

/**
 * @class UserService
 * @description The UserService class is used to manage User resources
 */
export class UserService {
  private app: Blanning;
  private index: string;
  private collection: string;

  constructor(app: Blanning) {
    this.app = app;
    this.index = app.configuration.index;
    this.collection = app.configuration.users;
  }

  /**
   * @description Create a new user
   */
  async create(user: User): Promise<User> {
    this.app.log.debug(user);

    await this.app.sdk.document.create(this.index, this.collection, user);

    return User.fromJson(user);
  }

  /**
   * @description Delete an user
   */
  async delete(userId: string): Promise<string> {
    await this.app.sdk.document.delete(this.index, this.collection, userId);

    return userId;
  }

  /**
   * @description Get an user
   */
  async get(userId: string): Promise<User> {
    const user = await this.app.sdk.document.get(this.index, this.collection, userId);

    return User.fromJson(user);
  }

  /**
   * @description List user
   */
  async list(): Promise<User[]> {
    const users = await this.app.sdk.document.search(this.index, this.collection, {});

    return users.hits.map((user: JSONObject) => User.fromJson(user._source));
  }

  /**
   * @description Update an user
   */
  async update(userId: string, user: User): Promise<User> {
    await this.app.sdk.document.update(this.index, this.collection, userId, user);

    return user;
  }
}
