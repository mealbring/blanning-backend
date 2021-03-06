import { JSONObject } from 'kuzzle';
import { Blanning } from '../..//core/Blanning';
import { Bring } from '../../core/Bring';
import { Planning } from './Planning.type';

/**
 * @class PlanningService
 * @description The PlanningService class is used to manage Planning resources
 */
export class PlanningService {
  private app: Blanning;
  private index: string;
  private collection: string;

  constructor(app: Blanning) {
    this.app = app;
    this.index = app.configuration.index;
    this.collection = app.configuration.plannings;
  }

  /**
   * @description Create a new planning
   */
  async create(planning: Planning): Promise<Planning> {
    this.app.log.debug(planning);

    await this.app.sdk.document.create(this.index, this.collection, planning);

    const currentUser = await this.app.sdk.auth.getCurrentUser();

    const userConfig = await this.app.sdk.document.get('configuration', 'users', currentUser._id);

    const bring = new Bring(userConfig._source.email, userConfig._source.password);
    bring.login();

    for (const recipe of planning.recipies) {
      for (const ingredient of recipe.ingredients) {
        bring.saveItem(userConfig._source.listId, ingredient.name, ingredient.specification);
      }
    }

    return Planning.fromJson(planning);
  }

  /**
   * @description Delete an planning
   */
  async delete(planningId: string): Promise<string> {
    await this.app.sdk.document.delete(this.index, this.collection, planningId);

    return planningId;
  }

  /**
   * @description Get an planning
   */
  async get(planningId: string): Promise<Planning> {
    const planning = await this.app.sdk.document.get(this.index, this.collection, planningId);

    return Planning.fromJson(planning);
  }

  /**
   * @description List planning
   */
  async list(): Promise<Planning[]> {
    const plannings = await this.app.sdk.document.search(this.index, this.collection, {});

    return plannings.hits.map((planning: JSONObject) => Planning.fromJson(planning._source));
  }

  /**
   * @description Update an planning
   */
  async update(planningId: string, planning: Planning): Promise<Planning> {
    await this.app.sdk.document.update(this.index, this.collection, planningId, planning);

    return planning;
  }
}
