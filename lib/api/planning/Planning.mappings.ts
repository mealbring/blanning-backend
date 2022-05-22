import { MappingsProperties } from 'kuzzle';

export const PlanningMappings = {
  mappings: {
    dynamic: 'true',
    properties: {
      endDate: { type: 'date' },
      recipies: { type: 'object' },
      startDate: { type: 'date' },
    },
  } as MappingsProperties,
};
