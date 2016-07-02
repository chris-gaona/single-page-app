'use strict';

describe('recipeDetailController', function () {
  // variables
  var recipesController,
    DataService,
    q,
    scope,
    $location,
    routeParams,
    recipe;

  beforeEach(module('app'));

  describe('$routeParams.id is defined', function () {
    beforeEach(inject(function ($rootScope, $controller, $q, _DataService_, $routeParams) {
      DataService = _DataService_;
      q = $q;
      routeParams = {};
      routeParams.id = 123456789;

      recipe = {
        data: {
          name: 'Cabbage Salad Goodness',
          description: 'Simple, light and tasty cabbage salad.',
          category: 'Salad',
          prepTime: 10,
          cookTime: 60,
          ingredients: [],
          _id: 'dBHEBmK8abxVorHi',
          steps: []
        }
      };

      scope = $rootScope.$new();

      recipesController = $controller('RecipeDetailController', {
        DataService: DataService,
        $routeParams: routeParams
      });
    }));

    it('should have a $routeParams.id value', function () {
      expect(recipesController.id).toEqual(123456789);
    });

    it('should be in editing mode', function () {
      expect(recipesController.editing).toBe(false);
    });

    it('should have called DataService.getOne()', function () {
      spyOn(DataService, 'getOne').and.callFake(function () {
        var deferred = q.defer();
        deferred.resolve(recipe);
        return deferred.promise;
      });

      scope.$apply(function () {
        recipesController.getOneRecipe(recipe);
      });

      expect(DataService.getOne).toHaveBeenCalled();
      expect(recipesController.response.length).toBe(recipe.length);
      expect(recipesController.editing).toBe(true);
      expect(recipesController.name).toEqual('Cabbage Salad Goodness');
      expect(recipesController.description).toEqual('Simple, light and tasty cabbage salad.');
      expect(recipesController.category).toEqual('Salad');
      expect(recipesController.prepTime).toEqual(10);
      expect(recipesController.cookTime).toEqual(60);
      expect(recipesController.ingredients).toEqual([]);
      expect(recipesController.steps).toEqual([]);
    });
  });

  describe('$routeParams.id is undefined', function () {
    beforeEach(inject(function ($rootScope, $controller, $q, _DataService_, $routeParams) {
      DataService = _DataService_;
      q = $q;
      routeParams = {};

      scope = $rootScope.$new();

      recipesController = $controller('RecipeDetailController', {
        DataService: DataService,
        $routeParams: routeParams
      });
    }));

    it('should have a $routeParams.id value', function () {
      expect(recipesController.id).not.toBeDefined();
    });

    it('should not have called DataService.getOne()', function () {
      spyOn(DataService, 'getOne').and.callFake(function () {
        var deferred = q.defer();
        deferred.resolve(recipe);
        return deferred.promise;
      });

      scope.$apply(function () {
        recipesController.getOneRecipe(recipe);
      });

      expect(recipesController.editing).toBe(false);
      expect(DataService.getOne).not.toHaveBeenCalled();
      expect(recipesController.response).not.toBeDefined();
      expect(recipesController.ingredients).toEqual([{foodItem: '', condition: '', amount: ''}]);
      expect(recipesController.steps).toEqual([{description: ''}]);
    });
  });

  beforeEach(inject(function ($controller, _$location_, _DataService_) {
    DataService = _DataService_;
    $location = _$location_;
    recipesController = $controller('RecipeDetailController');
  }));

  describe('addNewRec function', function () {
    it('should create a new empty ingredient item', function () {
      recipesController.ingredients = [];
      recipesController.addNewRec();
      expect(recipesController.ingredients).toEqual([{foodItem: '', condition: '', amount: ''}]);
    });
  });

  describe('addNewStep function', function () {
    it('should create a new empty step item', function () {
      recipesController.steps = [];
      recipesController.addNewStep();
      expect(recipesController.steps).toEqual([{description: ''}]);
    });
  });

  describe('saveRecipe function', function () {
    beforeEach(inject(function ($rootScope, $controller, $q) {
      q = $q;

      recipe = undefined;

      scope = $rootScope.$new();
    }));

    it('should call DataService.add()', function () {
      spyOn(DataService, 'add').and.callFake(function () {
        var deferred = q.defer();
        deferred.resolve(recipe);
        return deferred.promise;
      });

      scope.$apply(function () {
        recipesController.saveRecipe(recipe);
      });

      expect(DataService.add).toHaveBeenCalled();
      expect(recipesController.recipeObject).toEqual(undefined);
    });
  });

  describe('saveRecipe function', function () {
    beforeEach(inject(function ($rootScope, $controller, $q) {
      q = $q;

      recipe = {
        data: {
          name: 'Cabbage Salad Goodness',
          description: 'Simple, light and tasty cabbage salad.',
          category: 'Salad',
          prepTime: 10,
          cookTime: 60,
          ingredients: [],
          _id: 'dBHEBmK8abxVorHi',
          steps: []
        }
      };

      scope = $rootScope.$new();
    }));

    it('should call DataService.update()', function () {
      spyOn(DataService, 'update').and.callFake(function () {
        var deferred = q.defer();
        deferred.resolve(recipe);
        return deferred.promise;
      });

      scope.$apply(function () {
        recipesController.saveRecipe(recipe);
      });

      expect(DataService.update).toHaveBeenCalled();
      expect(recipesController.recipeObject).toEqual(recipe);
    });
  });

  describe('checkError function', function () {
    it('should initially have undefined error variables', function () {
      expect(recipesController.catErrors).toBe(undefined);
      expect(recipesController.ingErrors).toBe(undefined);
      expect(recipesController.nameErrors).toBe(undefined);
      expect(recipesController.stepErrors).toBe(undefined);
      expect(recipesController.checkError()).toBe(false);
    });

    it('should return true if error variables are defined', function () {
      recipesController.catErrors = 'Hello';
      recipesController.ingErrors = 'there';
      recipesController.nameErrors = 'I am';
      recipesController.stepErrors = 'defined';

      expect(recipesController.catErrors).toEqual('Hello');
      expect(recipesController.ingErrors).toEqual('there');
      expect(recipesController.nameErrors).toEqual('I am');
      expect(recipesController.stepErrors).toEqual('defined');
      expect(recipesController.checkError()).toBe(true);
    });

    it('should return true if only one error variables is defined', function () {
      recipesController.catErrors = 'Hello';

      expect(recipesController.catErrors).toEqual('Hello');
      expect(recipesController.ingErrors).toBe(undefined);
      expect(recipesController.nameErrors).toBe(undefined);
      expect(recipesController.stepErrors).toBe(undefined);
      expect(recipesController.checkError()).toBe(true);
    });
  });

  describe('cancel function', function () {
    it('should change the location path to /', function () {
      recipesController.cancel();
      expect($location.path()).toBe('/');
    });
  });

  describe('deleteIngr function ', function () {
    it('should splice out the passed in ingredient parameter', function () {
      var ingredients = ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'];
      recipesController.ingredients = ingredients;
      expect(recipesController.ingredients).toEqual(ingredients);
      expect(recipesController.ingredients.length).toBe(3);

      recipesController.deleteIngr(ingredients[0]);
      expect(recipesController.ingredients.length).toBe(2);
      expect(recipesController.modalShown).toEqual(false);
    });
  });

  describe('deleteStep function ', function () {
    it('should splice out the passed in step parameter', function () {
      var steps = ['Step 1', 'Step 2', 'Step 3'];
      recipesController.steps = steps;
      expect(recipesController.steps).toEqual(steps);
      expect(recipesController.steps.length).toBe(3);

      recipesController.deleteStep(steps[0]);
      expect(recipesController.steps.length).toBe(2);
      expect(recipesController.modalShown).toEqual(false);
    });
  });

  describe('toggleModal function', function () {
    it('should toggle the modalShown variable', function () {
      var item = 'Here is the item';
      expect(recipesController.modalShown).toBe(false);

      recipesController.toggleModal(item);
      expect(recipesController.chosenItem).toEqual(item);
      expect(recipesController.modalShown).toEqual(true);

      recipesController.toggleModal();
      expect(recipesController.modalShown).toEqual(false);
    });
  });

  describe('checkItem function', function () {
    it('should return true if item.foodItem does NOT equal undefined', function () {
      var item = {
        foodItem: 'Carrot'
      };

      expect(recipesController.checkItem(item)).toBe(false);
    });

    it('should return false if item.foodItem equals undefined', function () {
      var item = {};

      expect(recipesController.checkItem(item)).toBe(true);
    });
  });
});
