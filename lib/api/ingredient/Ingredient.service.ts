import { JSONObject } from 'kuzzle';
import { Blanning } from '../../core/Blanning';
import { Ingredient } from './Ingredient.type';

/**
 * @class IngredientService
 * @description The IngredientService class is used to manage Ingredient resources
 */
export class IngredientService {
  private app: Blanning;
  private index: string;
  private collection: string;

  constructor(app: Blanning) {
    this.app = app;
    this.index = app.configuration.index;
    this.collection = app.configuration.ingredients;
  }

  /**
   * @description Create a new ingredient
   */
  async create(ingredient: Ingredient): Promise<Ingredient> {
    this.app.log.debug(ingredient);

    await this.app.sdk.document.create(this.index, this.collection, ingredient);

    return Ingredient.fromJson(ingredient);
  }

  /**
   * @description Delete an ingredient
   */
  async delete(ingredientId: string): Promise<string> {
    await this.app.sdk.document.delete(this.index, this.collection, ingredientId);

    return ingredientId;
  }

  /**
   * @description Get an ingredient
   */
  async get(ingredientId: string): Promise<Ingredient> {
    const ingredient = await this.app.sdk.document.get(this.index, this.collection, ingredientId);

    return Ingredient.fromJson(ingredient);
  }

  /**
   * @description List ingredient
   */
  async list(): Promise<Ingredient[]> {
    const ingredients = await this.app.sdk.document.search(this.index, this.collection, {});

    return ingredients.hits.map((ingredient: JSONObject) => Ingredient.fromJson(ingredient._source));
  }

  /**
   * @description Update an ingredient
   */
  async update(ingredientId: string, ingredient: Ingredient): Promise<Ingredient> {
    await this.app.sdk.document.update(this.index, this.collection, ingredientId, ingredient);

    return ingredient;
  }
}
