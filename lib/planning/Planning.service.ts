import { Blanning } from 'lib/Blanning';
import { Planning } from './Planning.type';

/**
 * @class PlanningService
 * @description The PlanningService class is used to manage Planning resources
 */
export class PlanningService {
  private app: Blanning;

  constructor(app: Blanning) {
    this.app = app;
  }

  /**
   * @description Create a new planning
   */
  async create(planning: Planning): Promise<Planning> {
    this.app.log.debug(planning);

    return Planning.fromJson(planning);
  }

  /**
   * @description Delete an planning
   */
  async delete(planningId: string): Promise<string> {
    return planningId;
  }

  /**
   * @description Get an planning
   */
  async get(planningId: string): Promise<Planning> {
    const planning = new Planning(planningId, '16/05/2022', '23/05/2022', []);

    return Planning.fromJson(planning);
  }

  /**
   * @description List planning
   */
  async list(): Promise<Planning[]> {
    return [];
  }

  /**
   * @description Update an planning
   */
  async update(planning: Planning): Promise<Planning> {
    return planning;
  }
}
