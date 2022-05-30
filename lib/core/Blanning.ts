import { Backend, Mutex } from 'kuzzle';

import { Configuration } from './Blanning.type';

import { IngredientController } from '../api/ingredient/Ingredient.controller';
import { IngredientMappings } from '../api/ingredient/Ingredient.mappings';
import { PlanningController } from '../api/planning/Planning.controller';
import { PlanningMappings } from '../api/planning/Planning.mappings';
import { RecipeController } from '../api/recipe/Recipe.controller';
import { RecipiesMappings } from '../api/recipe/Recipe.mappings';
import { UsersMappings } from '../api/user/User.mappings';

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
    await mutex.lock();
    await this.initDatabase();
    await mutex.unlock();

    this.log.info('Blanning API started');
  }

  async initDatabase() {
    this.log.info('Initializing database');

    try {
      const indexExists = await this.sdk.index.exists(this.configuration.index);

      if (!indexExists) {
        const { index, ingredients, plannings, recipies, users } = this.configuration;
        await this.sdk.index.create(index);
        await this.sdk.collection.create(index, ingredients, IngredientMappings);
        await this.sdk.collection.create(index, plannings, PlanningMappings);
        await this.sdk.collection.create(index, recipies, RecipiesMappings);
        await this.sdk.collection.create(index, users, UsersMappings);
        this.log.info('Database initialized');
      } else {
        this.log.info('Database already initialized');
      }
    } catch (error) {
      this.log.error(error);
    }
  }
}
