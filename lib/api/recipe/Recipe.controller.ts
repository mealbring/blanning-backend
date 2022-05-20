import { Controller, KuzzleRequest } from 'kuzzle';

import { Blanning } from '../../core/Blanning';
import { Recipe } from './Recipe.type';
import { RecipeService } from './Recipe.service';

/**
 * @class RecipeController
 * @extends {Controller}
 * @description RecipeController is the controller to manage Recipes.
 */
export class RecipeController extends Controller {
  public recipeService: RecipeService;

  constructor(app: Blanning) {
    super(app);

    this.recipeService = new RecipeService(app);

    this.definition = {
      actions: {
        create: {
          handler: this.create,
          http: [{ path: 'recipes', verb: 'post' }],
        },
        delete: {
          handler: this.delete,
          http: [{ path: 'recipes/:recipeId', verb: 'delete' }],
        },
        get: {
          handler: this.get,
          http: [{ path: 'recipes/:recipeId', verb: 'get' }],
        },
        list: {
          handler: this.list,
          http: [{ path: 'recipes', verb: 'get' }],
        },
        update: {
          handler: this.update,
          http: [{ path: 'recipes/:recipeId', verb: 'put' }],
        },
      },
    };
  }

  /**
   * @description Add a new recipe
   */
  async create(request: KuzzleRequest): Promise<any> {
    this.app.log.debug(request);

    const recipe = Recipe.fromJson(request.input.body);

    return this.recipeService.create(recipe);
  }

  /**
   * @description Delete an recipe
   */
  async delete(request: KuzzleRequest): Promise<string> {
    this.app.log.debug(request);
    const recipeId = request.getString('recipeId');

    return this.recipeService.delete(recipeId);
  }

  /**
   * @description Get an recipe
   */
  async get(request: KuzzleRequest): Promise<Recipe> {
    this.app.log.debug(request);
    const recipeId = request.getString('recipeId');

    return this.recipeService.get(recipeId);
  }

  /**
   * @description Get all recipe
   */
  async list(request: KuzzleRequest): Promise<Recipe[]> {
    this.app.log.debug(request);

    return this.recipeService.list();
  }

  /**
   * @description Update an recipe
   */
  async update(request: KuzzleRequest): Promise<Recipe> {
    this.app.log.debug(request);

    const recipeId = request.getString('recipeId');
    const recipe = Recipe.fromJson(request.input.body);

    return this.recipeService.update(recipeId, recipe);
  }
}
