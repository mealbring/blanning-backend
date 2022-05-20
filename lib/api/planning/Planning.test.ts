import { KuzzleRequest } from 'kuzzle';

import { Blanning } from '../../core/Blanning';
import { PlanningController } from './Planning.controller';
import { Planning } from './Planning.type';

// ? We need to supress the singleton behavior of the Backend class for unit testing purpose
Reflect.defineProperty(global, 'app', {
  set() {
    /* Do nothing */
  },
});

describe('PlanningController', () => {
  const planningController = new PlanningController(new Blanning());

  describe('constructor', () => {
    it('test function available', () => {
      expect(planningController).toBeDefined();
      expect(planningController).toBeInstanceOf(PlanningController);
      expect(Object.keys(planningController.definition.actions)).toEqual(['create', 'delete', 'get', 'list', 'update']);
    });
  });

  describe('create', () => {
    it('should create an planning', async () => {
      const request = new KuzzleRequest(
        {
          body: {
            dueDate: '20/05/2022',
            name: 'my-planning',
            recipies: [],
            startDate: '20/05/2022',
          },
        },
        {}
      );

      jest.spyOn(planningController.planningService, 'create').mockImplementation(() => {
        return Promise.resolve({
          dueDate: '20/05/2022',
          name: 'my-planning',
          recipies: [],
          startDate: '20/05/2022',
        });
      });

      const result = await planningController.create(request);
      expect(result).toEqual(new Planning('my-planning', '20/05/2022', '20/05/2022', []));
    });
  });

  describe('delete', () => {
    it('should delete an planning', async () => {
      const request = new KuzzleRequest(
        {
          body: {
            dueDate: '20/05/2022',
            name: 'my-planning',
            recipies: [],
            startDate: '20/05/2022',
          },
          planningId: 'my-planning',
        },
        {}
      );

      jest.spyOn(planningController.planningService, 'delete').mockImplementation(() => {
        return Promise.resolve('my-planning');
      });

      const result = await planningController.delete(request);
      expect(result).toEqual('my-planning');
    });
  });

  describe('get', () => {
    it('should get an planning', async () => {
      const request = new KuzzleRequest(
        {
          body: {
            dueDate: '20/05/2022',
            name: 'my-planning',
            recipies: [],
            startDate: '20/05/2022',
          },
          planningId: 'my-planning',
        },
        {}
      );

      jest.spyOn(planningController.planningService, 'get').mockImplementation(() => {
        return Promise.resolve(new Planning('my-planning', '20/05/2022', '20/05/2022', []));
      });

      const result = await planningController.get(request);
      expect(result).toEqual(new Planning('my-planning', '20/05/2022', '20/05/2022', []));
    });
  });

  describe('list', () => {
    it('should get all plannings', async () => {
      jest.spyOn(planningController.planningService, 'list').mockImplementation(() => {
        return Promise.resolve([
          new Planning('my-planning', '20/05/2022', '20/05/2022', []),
          new Planning('my-planning', '20/05/2022', '20/05/2022', []),
        ]);
      });

      const result = await planningController.list(new KuzzleRequest({}, {}));
      expect(result).toEqual([
        new Planning('my-planning', '20/05/2022', '20/05/2022', []),
        new Planning('my-planning', '20/05/2022', '20/05/2022', []),
      ]);
    });
  });

  describe('update', () => {
    it('should update an planning', async () => {
      const request = new KuzzleRequest(
        {
          body: { dueDate: '20/05/2022', name: 'my-planning', recipies: [], startDate: '20/05/2022' },
          planningId: 'my-planning',
        },
        {}
      );

      jest.spyOn(planningController.planningService, 'update').mockImplementation(() => {
        return Promise.resolve(new Planning('my-planning', '20/05/2022', '20/05/2022', []));
      });

      const result = await planningController.update(request);
      expect(result).toEqual(new Planning('my-planning', '20/05/2022', '20/05/2022', []));
    });
  });
});
