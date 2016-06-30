'use strict';

describe('recipesController', function () {
  // variables
  var recipesController,
      DataService,
      timeout,
      q,
      scope,
      $location,
      recipe;

  beforeEach(module('app'));

  describe('deleteRecipe function', function () {
    beforeEach(inject(function ($rootScope, $controller, $timeout, $q, _DataService_) {
      recipe = {
        _id:'dBHEBmK8abxVorHi',
        name:'Cabbage Salad Goodness',
        category:'Salad'
      };

      DataService = _DataService_;
      timeout = $timeout;
      q = $q;

      scope = $rootScope.$new();

      recipesController = $controller('RecipesController', {
        DataService: DataService
      });

      recipesController.recipes = [
          {
            "name": "Cabbage Salad Goodness",
            "description": "Simple, light and tasty cabbage salad.",
            "category": "Salad",
            "prepTime": 10,
            "cookTime": 60,
            "_id": "dBHEBmK8abxVorHi"
          },
          {
            "name": "Grilled Cheese Sandwich",
            "description": "Quick to prepare and delicious chees sandwiches.",
            "category": "Appetizer/Snack",
            "prepTime": 10,
            "cookTime": 7,
            "_id": "8kutKKiHSYpGd4sW"
          },
          {
            "name": "Grilled Steak",
            "description": "Simple and tasty meat dish.",
            "category": "Entree",
            "prepTime": 65,
            "cookTime": 10,
            "_id": "284yV1AUCCA0w8Gw"
          }
        ];
    }));

    it('should call DataService.remove function', function () {
      // Methods of DataService can be spied on individually and given mock behavior specific to each test.
      // Mock implementation of DataService.remove()
      spyOn(DataService, 'remove').and.callFake(function () {
        var deferred = q.defer();
        deferred.resolve(recipe);
        return deferred.promise;
      });
      // Perform an action
      // Code in the body of the callback function will be // updated as if it were running in an Angular app.
      scope.$apply(function () {
        recipesController.deleteRecipe(recipe);
      });
      // Run expectations
      expect(DataService.remove).toHaveBeenCalled();
      expect(recipesController.response.length).toBe(recipe.length);
    });

    it('should remove the recipe deleted from the array', function () {
      expect(recipesController.recipes.length).toEqual(3);

      recipesController.deleteRecipe(recipesController.recipes[0]);

      expect(recipesController.recipes.length).toEqual(2);

      recipesController.deleteRecipe(recipesController.recipes);

      expect(recipesController.recipes.length).toEqual(1);
    });
  });

  describe('addNew function', function () {
    beforeEach(inject(function ($controller, _$location_) {
      $location = _$location_;
      recipesController = $controller('RecipesController');
    }));

    it('should direct the user to the recipe detail page', function () {
      $location.path('/');
      expect($location.path()).toBe('/');
      recipesController.addNew();
      expect($location.path()).toBe('/add');
    });
  });

  describe('toggleModal function', function () {
    beforeEach(inject(function ($controller, _$location_) {
      $location = _$location_;
      recipesController = $controller('RecipesController');
    }));

    it('should be false', function () {
      expect(recipesController.modalShown).toBe(false);
    });

    it('should toggle modalShown variable', function () {
      recipesController.toggleModal();
      expect(recipesController.modalShown).toBe(true);
      recipesController.toggleModal();
      expect(recipesController.modalShown).toBe(false);
    });

    it('should pass in the current recipe to store in chosenRecipe variable', function () {
      var recipe = {
        "name": "Cabbage Salad Goodness",
        "description": "Simple, light and tasty cabbage salad.",
        "category": "Salad",
        "prepTime": 10
      };

      recipesController.toggleModal(recipe);
      expect(recipesController.chosenRecipe.name).toBeDefined();
      expect(recipesController.chosenRecipe.name).toContain("Cabbage Salad Goodness");
      expect(recipesController.chosenRecipe.description).toBeDefined();
    });
  });
});
