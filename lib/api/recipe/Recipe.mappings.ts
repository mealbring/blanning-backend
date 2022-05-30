import { MappingsProperties } from 'kuzzle';

export const RecipiesMappings = {
  mappings: {
    dynamic: 'true',
    properties: {
      ingredients: { type: 'object' },
      name: { type: 'keyword' },
      portions: { type: 'integer' },
    },
  },
} as MappingsProperties;
