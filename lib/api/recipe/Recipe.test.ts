import { KuzzleRequest } from 'kuzzle';

import { Blanning } from '../../core/Blanning';
import { RecipeController } from './Recipe.controller';
import { Recipe } from './Recipe.type';

// ? We need to supress the singleton behavior of the Backend class for unit testing purpose
Reflect.defineProperty(global, 'app', {
  set() {
    /* Do nothing */
  },
});

describe('RecipeController', () => {
  const recipeController = new RecipeController(new Blanning());

  describe('constructor', () => {
    it('test function available', () => {
      expect(recipeController).toBeDefined();
      expect(recipeController).toBeInstanceOf(RecipeController);
      expect(Object.keys(recipeController.definition.actions)).toEqual(['create', 'delete', 'get', 'list', 'update']);
    });
  });

  describe('create', () => {
    it('should create an recipe', async () => {
      const request = new KuzzleRequest(
        {
          body: {
            ingredients: [],
            name: 'my-recipe',
            portions: 2,
          },
        },
        {}
      );

      jest.spyOn(recipeController.recipeService, 'create').mockImplementation(() => {
        return Promise.resolve({
          ingredients: [],
          name: 'my-recipe',
          portions: 2,
        });
      });

      const result = await recipeController.create(request);
      expect(result).toEqual(new Recipe('my-recipe', 2, []));
    });
  });

  describe('delete', () => {
    it('should delete an recipe', async () => {
      const request = new KuzzleRequest(
        {
          body: {
            ingredients: [],
            name: 'my-recipe',
            portions: 2,
          },
          recipeId: 'my-recipe',
        },
        {}
      );

      jest.spyOn(recipeController.recipeService, 'delete').mockImplementation(() => {
        return Promise.resolve('my-recipe');
      });

      const result = await recipeController.delete(request);
      expect(result).toEqual('my-recipe');
    });
  });

  describe('get', () => {
    it('should get an recipe', async () => {
      const request = new KuzzleRequest(
        {
          body: {
            ingredients: [],
            name: 'my-recipe',
            portions: 2,
          },
          recipeId: 'my-recipe',
        },
        {}
      );

      jest.spyOn(recipeController.recipeService, 'get').mockImplementation(() => {
        return Promise.resolve(new Recipe('my-recipe', 2, []));
      });

      const result = await recipeController.get(request);
      expect(result).toEqual(new Recipe('my-recipe', 2, []));
    });
  });

  describe('list', () => {
    it('should get all recipes', async () => {
      jest.spyOn(recipeController.recipeService, 'list').mockImplementation(() => {
        return Promise.resolve([new Recipe('my-recipe', 2, []), new Recipe('my-recipe', 2, [])]);
      });

      const result = await recipeController.list(new KuzzleRequest({}, {}));
      expect(result).toEqual([new Recipe('my-recipe', 2, []), new Recipe('my-recipe', 2, [])]);
    });
  });

  describe('update', () => {
    it('should update an recipe', async () => {
      const request = new KuzzleRequest(
        {
          body: {
            ingredients: [],
            name: 'my-recipe',
            portions: 2,
          },
          recipeId: 'my-recipe',
        },
        {}
      );

      jest.spyOn(recipeController.recipeService, 'update').mockImplementation(() => {
        return Promise.resolve(new Recipe('my-recipe', 2, []));
      });

      const result = await recipeController.update(request);
      expect(result).toEqual(new Recipe('my-recipe', 2, []));
    });
  });
});
