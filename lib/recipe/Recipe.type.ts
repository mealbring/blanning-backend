import { JSONObject } from 'kuzzle';
import { Ingredient } from '../ingredient/Ingredient.type';

export class Recipe {
  public name: string;
  public startDate: string;
  public dueDate: string;
  public ingredients: Recipe[];

  constructor(name: string, startDate: string, dueDate: string, ingredients: Recipe[] = []) {
    this.name = name;
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.ingredients = ingredients;
  }

  static fromJson(json: JSONObject): Recipe {
    return new Recipe(
      json.name,
      json.startDate,
      json.dueDate,
      json.ingredients.map(Ingredient.fromJson)
    );
  }
}
