'use strict';

describe('recipeDetailController', function () {
  // variables
  var recipesController,
      DataService,
      timeout,
      q,
      scope,
      $location,
      routeParams,
      recipe;

  beforeEach(module('app'));

  describe('$routeParams.id is defined', function () {
    beforeEach(inject(function ($rootScope, $controller, $timeout, $q, _DataService_, $routeParams) {
      DataService = _DataService_;
      timeout = $timeout;
      q = $q;
      routeParams = {};
      routeParams.id = 123456789;

      recipe = {
        data: {
          name: "Cabbage Salad Goodness",
          description: "Simple, light and tasty cabbage salad.",
          category: "Salad",
          prepTime: 10,
          cookTime: 60,
          ingredients: [],
          _id: "dBHEBmK8abxVorHi",
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
    beforeEach(inject(function ($rootScope, $controller, $timeout, $q, _DataService_, $routeParams) {
      DataService = _DataService_;
      timeout = $timeout;
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

  describe('addNewRec function', function () {
    beforeEach(inject(function ($controller) {
      recipesController = $controller('RecipeDetailController');

      recipesController.ingredients = [];
    }));

    it('should create a new empty ingredient item', function () {
      recipesController.addNewRec();
      expect(recipesController.ingredients).toEqual([{foodItem: '', condition: '', amount: ''}]);
    });
  });

  describe('addNewStep function', function () {
    beforeEach(inject(function ($controller) {
      recipesController = $controller('RecipeDetailController');

      recipesController.steps = [];
    }));

    it('should create a new empty step item', function () {
      recipesController.addNewStep();
      expect(recipesController.steps).toEqual([{description: ''}]);
    });
  });

  describe('saveRecipe function', function () {
    beforeEach(inject(function ($rootScope, $controller, $timeout, $q, _DataService_) {
      DataService = _DataService_;
      timeout = $timeout;
      q = $q;

      recipe = undefined;

      scope = $rootScope.$new();

      recipesController = $controller('RecipeDetailController', {
        DataService: DataService
      });
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
    beforeEach(inject(function ($rootScope, $controller, $timeout, $q, _DataService_) {
      DataService = _DataService_;
      timeout = $timeout;
      q = $q;

      recipe = {
        data: {
          name: "Cabbage Salad Goodness",
          description: "Simple, light and tasty cabbage salad.",
          category: "Salad",
          prepTime: 10,
          cookTime: 60,
          ingredients: [],
          _id: "dBHEBmK8abxVorHi",
          steps: []
        }
      };

      scope = $rootScope.$new();

      recipesController = $controller('RecipeDetailController', {
        DataService: DataService
      });
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


});
