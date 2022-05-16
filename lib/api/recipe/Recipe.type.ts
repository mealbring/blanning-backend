import { JSONObject } from 'kuzzle';
import { Ingredient } from '../ingredient/Ingredient.type';

export class Recipe {
  public name: string;
  public startDate: string;
  public dueDate: string;
  public ingredients: Recipe[];
  public portions: number;

  constructor(
    name: string,
    startDate: string,
    dueDate: string,
    portions: number,
    ingredients: Recipe[] = []
  ) {
    this.name = name;
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.ingredients = ingredients;
    this.portions = portions;
  }

  static fromJson(json: JSONObject): Recipe {
    return new Recipe(
      json.name,
      json.startDate,
      json.dueDate,
      json.portions,
      json.ingredients.map(Ingredient.fromJson)
    );
  }
}
