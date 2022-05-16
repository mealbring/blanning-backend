import { JSONObject } from 'kuzzle';

export class Ingredient {
  public name: string;
  public specification: string;

  constructor(name: string, specification: string) {
    this.name = name;
    this.specification = specification;
  }

  static fromJson(json: JSONObject): Ingredient {
    return new Ingredient(json.name, json.specification);
  }
}
