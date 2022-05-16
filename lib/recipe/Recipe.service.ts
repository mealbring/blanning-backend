import { Blanning } from 'lib/Blanning';
import { Recipe } from './Recipe.type';

/**
 * @class RecipeService
 * @description The RecipeService class is used to manage Recipe resources
 */
export class RecipeService {
  private app: Blanning;

  constructor(app: Blanning) {
    this.app = app;
  }

  /**
   * @description Create a new recipe
   */
  async create(recipe: Recipe): Promise<Recipe> {
    this.app.log.debug(recipe);

    return Recipe.fromJson(recipe);
  }

  /**
   * @description Delete an recipe
   */
  async delete(recipeId: string): Promise<string> {
    return recipeId;
  }

  /**
   * @description Get an recipe
   */
  async get(recipeId: string): Promise<Recipe> {
    const recipe = new Recipe(recipeId, '16/05/2022', '23/05/2022', 2, []);

    return Recipe.fromJson(recipe);
  }

  /**
   * @description List recipe
   */
  async list(): Promise<Recipe[]> {
    return [];
  }

  /**
   * @description Update an recipe
   */
  async update(recipe: Recipe): Promise<Recipe> {
    return recipe;
  }
}
