import { MappingsProperties } from 'kuzzle';

export const IngredientMappings = {
  mappings: {
    dynamic: 'true',
    properties: {
      name: { type: 'keyword' },
      specifications: { type: 'keyword' },
    },
  } as MappingsProperties,
};
