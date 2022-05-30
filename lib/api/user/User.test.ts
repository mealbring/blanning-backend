import { KuzzleRequest } from 'kuzzle';

import { Blanning } from '../../core/Blanning';
import { UserController } from './User.controller';
import { User } from './User.type';

// ? We need to supress the singleton behavior of the Backend class for unit testing purpose
Reflect.defineProperty(global, 'app', {
  set() {
    /* Do nothing */
  },
});

describe('UserController', () => {
  const userController = new UserController(new Blanning());

  describe('constructor', () => {
    it('test function available', () => {
      expect(userController).toBeDefined();
      expect(userController).toBeInstanceOf(UserController);
      expect(Object.keys(userController.definition.actions)).toEqual(['create', 'delete', 'get', 'list', 'update']);
    });
  });

  describe('create', () => {
    it('should create an user', async () => {
      const request = new KuzzleRequest(
        {
          body: { email: 'email', listId: 'listId', password: 'password' },
        },
        {}
      );

      jest.spyOn(userController.userService, 'create').mockImplementation(() => {
        return Promise.resolve({
          email: 'email',
          listId: 'listId',
          password: 'password',
        });
      });

      const result = await userController.create(request);
      expect(result).toEqual(new User('email', 'password', 'listId'));
    });
  });

  describe('delete', () => {
    it('should delete an user', async () => {
      const request = new KuzzleRequest(
        {
          body: { email: 'email', listId: 'listId', password: 'password' },
          userId: 'my-userId',
        },
        {}
      );

      jest.spyOn(userController.userService, 'delete').mockImplementation(() => {
        return Promise.resolve('my-userId');
      });

      const result = await userController.delete(request);
      expect(result).toEqual('my-userId');
    });
  });

  describe('get', () => {
    it('should get an user', async () => {
      const request = new KuzzleRequest(
        {
          body: { email: 'email', password: 'password' },
          userId: 'my-userId',
        },
        {}
      );

      jest.spyOn(userController.userService, 'get').mockImplementation(() => {
        return Promise.resolve(new User('email', 'password', 'listId'));
      });

      const result = await userController.get(request);
      expect(result).toEqual(new User('email', 'password', 'listId'));
    });
  });

  describe('list', () => {
    it('should get all users', async () => {
      jest.spyOn(userController.userService, 'list').mockImplementation(() => {
        return Promise.resolve([new User('email', 'password', 'listId'), new User('email', 'password', 'listId')]);
      });

      const result = await userController.list(new KuzzleRequest({}, {}));
      expect(result).toEqual([new User('email', 'password', 'listId'), new User('email', 'password', 'listId')]);
    });
  });

  describe('update', () => {
    it('should update an user', async () => {
      const request = new KuzzleRequest(
        {
          body: { email: 'email', listId: 'listId', password: 'password' },
          userId: 'my-userId',
        },
        {}
      );

      jest.spyOn(userController.userService, 'update').mockImplementation(() => {
        return Promise.resolve(new User('email', 'password', 'listId'));
      });

      const result = await userController.update(request);
      expect(result).toEqual(new User('email', 'password', 'listId'));
    });
  });
});
