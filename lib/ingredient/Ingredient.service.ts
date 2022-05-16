import { Blanning } from 'lib/Blanning';
import { Ingredient } from './Ingredient.type';

/**
 * @class IngredientService
 * @description The IngredientService class is used to manage Ingredient resources
 */
export class IngredientService {
  private app: Blanning;

  constructor(app: Blanning) {
    this.app = app;
  }

  /**
   * @description Create a new ingredient
   */
  async create(ingredient: Ingredient): Promise<Ingredient> {
    this.app.log.debug(ingredient);

    return Ingredient.fromJson(ingredient);
  }

  /**
   * @description Delete an ingredient
   */
  async delete(ingredientId: string): Promise<string> {
    return ingredientId;
  }

  /**
   * @description Get an ingredient
   */
  async get(ingredientId: string): Promise<Ingredient> {
    const ingredient = new Ingredient(ingredientId, 'todo, find me from database');

    return Ingredient.fromJson(ingredient);
  }

  /**
   * @description List ingredient
   */
  async list(): Promise<Ingredient[]> {
    return [];
  }

  /**
   * @description Update an ingredient
   */
  async update(ingredient: Ingredient): Promise<Ingredient> {
    return ingredient;
  }
}
