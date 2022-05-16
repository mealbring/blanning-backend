import { JSONObject } from 'kuzzle';
import { Recipe } from '../recipe/Recipe.type';

export class Planning {
  public name: string;
  public startDate: string;
  public dueDate: string;
  public recipies: Recipe[];

  constructor(name: string, startDate: string, dueDate: string, recipies: Recipe[] = []) {
    this.name = name;
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.recipies = recipies;
  }

  static fromJson(json: JSONObject): Planning {
    return new Planning(json.name, json.startDate, json.dueDate, json.recipies.map(Recipe.fromJson));
  }
}
