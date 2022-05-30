import { MappingsProperties } from 'kuzzle';

export const UsersMappings = {
  mappings: {
    dynamic: 'true',
    properties: {
      email: { type: 'keyword' },
      listId: { type: 'keyword' },
      password: { type: 'keyword' },
    },
  } as MappingsProperties,
};
