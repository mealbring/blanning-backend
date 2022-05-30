import { Controller, KuzzleRequest } from 'kuzzle';

import { Blanning } from '../../core/Blanning';
import { User } from './User.type';
import { UserService } from './User.service';

/**
 * @class UserController
 * @extends {Controller}
 * @description UserController is the controller to manage Users.
 */
export class UserController extends Controller {
  public userService: UserService;

  constructor(app: Blanning) {
    super(app);

    this.userService = new UserService(app);

    this.definition = {
      actions: {
        create: {
          handler: this.create,
          http: [{ path: 'users', verb: 'post' }],
        },
        delete: {
          handler: this.delete,
          http: [{ path: 'users/:userId', verb: 'delete' }],
        },
        get: {
          handler: this.get,
          http: [{ path: 'users/:userId', verb: 'get' }],
        },
        list: {
          handler: this.list,
          http: [{ path: 'users', verb: 'get' }],
        },
        update: {
          handler: this.update,
          http: [{ path: 'users/:userId', verb: 'put' }],
        },
      },
    };
  }

  /**
   * @description Add a new user
   */
  async create(request: KuzzleRequest): Promise<User> {
    this.app.log.debug(request);

    const user = User.fromJson(request.input.body);

    return this.userService.create(user);
  }

  /**
   * @description Delete an user
   */
  async delete(request: KuzzleRequest): Promise<string> {
    this.app.log.debug(request);
    const userId = request.getString('userId');

    return this.userService.delete(userId);
  }

  /**
   * @description Get an user
   */
  async get(request: KuzzleRequest): Promise<User> {
    this.app.log.debug(request);
    const userId = request.getString('userId');

    return this.userService.get(userId);
  }

  /**
   * @description Get all user
   */
  async list(request: KuzzleRequest): Promise<User[]> {
    this.app.log.debug(request);

    return this.userService.list();
  }

  /**
   * @description Update an user
   */
  async update(request: KuzzleRequest): Promise<User> {
    this.app.log.debug(request);

    const userId = request.getString('userId');
    const user = User.fromJson(request.input.body);

    return this.userService.update(userId, user);
  }
}
