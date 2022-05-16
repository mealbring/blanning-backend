// ? We need to supress the singleton behavior of the Backend class for unit testing purpose
Reflect.defineProperty(global, 'app', {
  set() {
    /* Do nothing */
  },
});

describe('IngredientController', () => {
  // const IngredientController = new IngredientController(new Blanning());

  describe('constructor', () => {
    it.todo('should instanciate a new IngredientController');
  });
});
