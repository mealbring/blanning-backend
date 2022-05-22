import { JSONObject } from 'kuzzle';
import { Ingredient } from '../ingredient/Ingredient.type';

export class Recipe {
  public name: string;
  public ingredients: Ingredient[];
  public portions: number;

  constructor(name: string, portions: number, ingredients: Ingredient[] = []) {
    this.name = name;
    this.ingredients = ingredients;
    this.portions = portions;
  }

  static fromJson(json: JSONObject): Recipe {
    return new Recipe(json.name, json.portions, json.ingredients.map(Ingredient.fromJson));
  }
}
