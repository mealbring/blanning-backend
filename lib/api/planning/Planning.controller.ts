import { Controller, KuzzleRequest } from 'kuzzle';

import { Blanning } from '../../core/Blanning';
import { Planning } from './Planning.type';
import { PlanningService } from './Planning.service';

/**
 * @class PlanningController
 * @extends {Controller}
 * @description PlanningController is the controller to manage Plannings.
 */
export class PlanningController extends Controller {
  private planningService: PlanningService;

  constructor(app: Blanning) {
    super(app);

    this.planningService = new PlanningService(app);

    this.definition = {
      actions: {
        create: {
          handler: this.create,
          http: [{ path: 'plannings', verb: 'post' }],
        },
        delete: {
          handler: this.delete,
          http: [{ path: 'plannings/:planningId', verb: 'delete' }],
        },
        get: {
          handler: this.get,
          http: [{ path: 'plannings/:planningId', verb: 'get' }],
        },
        list: {
          handler: this.list,
          http: [{ path: 'plannings', verb: 'get' }],
        },
        update: {
          handler: this.update,
          http: [{ path: 'plannings/:planningId', verb: 'put' }],
        },
      },
    };
  }

  /**
   * @description Add a new planning
   */
  async create(request: KuzzleRequest): Promise<any> {
    this.app.log.debug(request);

    const planning = Planning.fromJson(request.input.body);

    return this.planningService.create(planning);
  }

  /**
   * @description Delete an planning
   */
  async delete(request: KuzzleRequest): Promise<string> {
    this.app.log.debug(request);
    const planningId = request.getString('planningId');

    return this.planningService.delete(planningId);
  }

  /**
   * @description Get an planning
   */
  async get(request: KuzzleRequest): Promise<Planning> {
    this.app.log.debug(request);
    const planningId = request.getString('planningId');

    return this.planningService.get(planningId);
  }

  /**
   * @description Get all planning
   */
  async list(request: KuzzleRequest): Promise<Planning[]> {
    this.app.log.debug(request);

    return this.planningService.list();
  }

  /**
   * @description Update an planning
   */
  async update(request: KuzzleRequest): Promise<Planning> {
    this.app.log.debug(request);

    const planningId = request.getString('planningId');
    const planning = Planning.fromJson(request.input.body);

    return this.planningService.update(planningId, planning);
  }
}
