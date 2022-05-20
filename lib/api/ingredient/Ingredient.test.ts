import { KuzzleRequest } from 'kuzzle';

import { Blanning } from '../../core/Blanning';
import { IngredientController } from './Ingredient.controller';
import { Ingredient } from './Ingredient.type';

// ? We need to supress the singleton behavior of the Backend class for unit testing purpose
Reflect.defineProperty(global, 'app', {
  set() {
    /* Do nothing */
  },
});

describe('IngredientController', () => {
  const ingredientController = new IngredientController(new Blanning());

  describe('constructor', () => {
    it('test function available', () => {
      expect(ingredientController).toBeDefined();
      expect(ingredientController).toBeInstanceOf(IngredientController);
      expect(Object.keys(ingredientController.definition.actions)).toEqual([
        'create',
        'delete',
        'get',
        'list',
        'update',
      ]);
    });
  });

  describe('create', () => {
    it('should create an ingredient', async () => {
      const request = new KuzzleRequest(
        {
          body: { name: 'my-ingredient', specification: 'my-specification' },
        },
        {}
      );

      jest.spyOn(ingredientController.ingredientService, 'create').mockImplementation(() => {
        return Promise.resolve({
          name: 'my-ingredient',
          specification: 'my-specification',
        });
      });

      const result = await ingredientController.create(request);
      expect(result).toEqual(new Ingredient('my-ingredient', 'my-specification'));
    });
  });

  describe('delete', () => {
    it('should delete an ingredient', async () => {
      const request = new KuzzleRequest(
        {
          body: { name: 'my-ingredient', specification: 'my-specification' },
          ingredientId: 'my-ingredient',
        },
        {}
      );

      jest.spyOn(ingredientController.ingredientService, 'delete').mockImplementation(() => {
        return Promise.resolve('my-ingredient');
      });

      const result = await ingredientController.delete(request);
      expect(result).toEqual('my-ingredient');
    });
  });

  describe('get', () => {
    it('should get an ingredient', async () => {
      const request = new KuzzleRequest(
        {
          body: { name: 'my-ingredient', specification: 'my-specification' },
          ingredientId: 'my-ingredient',
        },
        {}
      );

      jest.spyOn(ingredientController.ingredientService, 'get').mockImplementation(() => {
        return Promise.resolve(new Ingredient('my-ingredient', 'my-specification'));
      });

      const result = await ingredientController.get(request);
      expect(result).toEqual(new Ingredient('my-ingredient', 'my-specification'));
    });
  });

  describe('list', () => {
    it('should get all ingredients', async () => {
      jest.spyOn(ingredientController.ingredientService, 'list').mockImplementation(() => {
        return Promise.resolve([
          new Ingredient('my-ingredient', 'my-specification'),
          new Ingredient('my-ingredient', 'my-specification'),
        ]);
      });

      const result = await ingredientController.list(new KuzzleRequest({}, {}));
      expect(result).toEqual([
        new Ingredient('my-ingredient', 'my-specification'),
        new Ingredient('my-ingredient', 'my-specification'),
      ]);
    });
  });

  describe('update', () => {
    it('should update an ingredient', async () => {
      const request = new KuzzleRequest(
        {
          body: { name: 'my-ingredient', specification: 'my-specification' },
          ingredientId: 'my-ingredient',
        },
        {}
      );

      jest.spyOn(ingredientController.ingredientService, 'update').mockImplementation(() => {
        return Promise.resolve(new Ingredient('my-ingredient', 'my-specification'));
      });

      const result = await ingredientController.update(request);
      expect(result).toEqual(new Ingredient('my-ingredient', 'my-specification'));
    });
  });
});
