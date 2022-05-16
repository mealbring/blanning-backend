import BringApi from 'bring-shopping';

export class Bring {
  private mail: string;
  private password: string;
  private bringApi: BringApi;

  constructor(mail: string, password: string) {
    this.mail = mail;
    this.password = password;

    this.bringApi = new BringApi({ mail, password });
  }

  async login() {
    return this.bringApi.login();
  }

  async lists(): Promise<any> {
    const lists = await this.bringApi.loadLists();

    return lists;
  }

  async list(listId: string): Promise<any> {
    const ingredients = await this.bringApi.getItems(listId);

    return ingredients;
  }

  async saveItem(listId: string, itemName: string, spec: string): Promise<any> {
    const result = await this.bringApi.saveItem(listId, itemName, spec);

    return result;
  }
}
