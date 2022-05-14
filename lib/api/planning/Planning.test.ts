// ? We need to supress the singleton behavior of the Backend class for unit testing purpose
Reflect.defineProperty(global, "app", {
  set() {
    /* Do nothing */
  },
});

describe("PlanningController", () => {
  // const PlanningController = new PlanningController(new ConsoleAPI());

  describe("constructor", () => {
    it.todo("should instanciate a new PlanningController");
  });
});
