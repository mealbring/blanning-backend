import { JSONObject } from 'kuzzle';

export class User {
  public email: string;
  public password: string;
  public listId: string;

  constructor(email: string, password: string, listId: string) {
    this.email = email;
    this.password = password;
    this.listId = listId;
  }

  static fromJson(json: JSONObject): User {
    return new User(json.email, json.password, json.listId);
  }
}
