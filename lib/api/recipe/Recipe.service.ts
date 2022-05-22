import { JSONObject } from 'kuzzle';
import { Blanning } from 'lib/core/Blanning';
import { Recipe } from './Recipe.type';

/**
 * @class RecipeService
 * @description The RecipeService class is used to manage Recipe resources
 */
export class RecipeService {
  private app: Blanning;
  private index: string;
  private collection: string;

  constructor(app: Blanning) {
    this.app = app;
    this.index = app.configuration.index;
    this.collection = app.configuration.recipies;
  }

  /**
   * @description Create a new recipe
   */
  async create(recipe: Recipe): Promise<Recipe> {
    this.app.log.debug(recipe);

    await this.app.sdk.document.create(this.index, this.collection, recipe);

    return Recipe.fromJson(recipe);
  }

  /**
   * @description Delete an recipe
   */
  async delete(recipeId: string): Promise<string> {
    await this.app.sdk.document.delete(this.index, this.collection, recipeId);

    return recipeId;
  }

  /**
   * @description Get an recipe
   */
  async get(recipeId: string): Promise<Recipe> {
    const recipe = await this.app.sdk.document.get(this.index, this.collection, recipeId);

    return Recipe.fromJson(recipe);
  }

  /**
   * @description List recipe
   */
  async list(): Promise<Recipe[]> {
    const recipies = await this.app.sdk.document.search(this.index, this.collection, {});

    return recipies.hits.map((recipe: JSONObject) => Recipe.fromJson(recipe._source));
  }

  /**
   * @description Update an recipe
   */
  async update(recipeId: string, recipe: Recipe): Promise<Recipe> {
    await this.app.sdk.document.update(this.index, this.collection, recipeId, recipe);

    return recipe;
  }
}
