import { Backend } from 'kuzzle';

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

    this.log.info('Blanning API started');
  }
}
