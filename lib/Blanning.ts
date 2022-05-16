import { Backend, MappingsProperties, Mutex } from 'kuzzle';

import { Configuration } from './Blanning.type';

import { IngredientController } from './ingredient/Ingredient.controller';
import { PlanningController } from './planning/Planning.controller';
import { RecipeController } from './recipe/Recipe.controller';

export class Blanning extends Backend {
  public configuration: Configuration;

  constructor() {
    super('blanning');
    this.configuration = this.config.content.application as Configuration;

    this.controller.use(new IngredientController(this));
    this.controller.use(new PlanningController(this));
    this.controller.use(new RecipeController(this));
  }

  override async start(): Promise<void> {
    await super.start();

    const mutex = new Mutex('blanning');
    mutex.lock();
    this.initDatabase();
    mutex.unlock();

    this.log.info('Blanning API started');
  }

  public async initDatabase() {
    this.log.info('Initializing database');
    const indexExists = await this.sdk.index.exists(this.configuration.index);

    if (!indexExists) {
      await this.sdk.index.create(this.configuration.index);
      await this.sdk.collection.create(this.configuration.index, 'ingredients', {
        mappings: {
          dynamic: 'true',
          properties: {
            name: { type: 'keyword' },
            specifications: { type: 'keyword' },
          },
        } as MappingsProperties,
      });

      await this.sdk.collection.create(this.configuration.index, 'planning', {
        mappings: {
          dynamic: 'true',
          properties: {
            endDate: { type: 'date' },
            recipies: { type: 'object' },
            startDate: { type: 'date' },
          },
        } as MappingsProperties,
      });

      await this.sdk.collection.create(this.configuration.index, 'recipe', {
        mappings: {
          dynamic: 'true',
          properties: {
            ingredients: { type: 'object' },
            name: { type: 'keyword' },
            portions: { type: 'integer' },
          },
        } as MappingsProperties,
      });
      this.log.info('Database initialized');
    } else {
      this.log.info('Database already initialized');
    }
  }
}
