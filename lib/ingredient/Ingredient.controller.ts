import { Controller, KuzzleRequest } from 'kuzzle';

import { Blanning } from '../Blanning';
import { Ingredient } from './Ingredient.type';
import { IngredientService } from './Ingredient.service';

/**
 * @class IngredientController
 * @extends {Controller}
 * @description IngredientController is the controller to manage Ingredients.
 */
export class IngredientController extends Controller {
  private ingredientService: IngredientService;

  constructor(app: Blanning) {
    super(app);

    this.ingredientService = new IngredientService(app);

    this.definition = {
      actions: {
        create: {
          handler: this.create,
          http: [{ path: 'ingredients', verb: 'post' }],
        },
        delete: {
          handler: this.delete,
          http: [{ path: 'ingredients/:ingredientId', verb: 'delete' }],
        },
        get: {
          handler: this.get,
          http: [{ path: 'ingredients/:ingredientId', verb: 'get' }],
        },
        list: {
          handler: this.list,
          http: [{ path: 'ingredients', verb: 'get' }],
        },
        update: {
          handler: this.update,
          http: [{ path: 'ingredients/:ingredientId', verb: 'put' }],
        },
      },
    };
  }

  /**
   * @description Add a new ingredient
   */
  async create(request: KuzzleRequest): Promise<any> {
    this.app.log.debug(request);

    const ingredient = Ingredient.fromJson(request.input.body);

    return this.ingredientService.create(ingredient);
  }

  /**
   * @description Delete an ingredient
   */
  async delete(request: KuzzleRequest): Promise<string> {
    this.app.log.debug(request);
    const resourceId = request.getString('resourceId');

    return this.ingredientService.delete(resourceId);
  }

  /**
   * @description Get an ingredient
   */
  async get(request: KuzzleRequest): Promise<Ingredient> {
    this.app.log.debug(request);
    const resourceId = request.getString('resourceId');

    return this.ingredientService.get(resourceId);
  }

  /**
   * @description Get all ingredient
   */
  async list(request: KuzzleRequest): Promise<Ingredient[]> {
    this.app.log.debug(request);

    return this.ingredientService.list();
  }

  /**
   * @description Update an ingredient
   */
  async update(request: KuzzleRequest): Promise<Ingredient> {
    this.app.log.debug(request);

    const ingredient = Ingredient.fromJson(request.input.body);

    return this.ingredientService.update(ingredient);
  }
}
