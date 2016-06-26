'use strict';

describe('recipesController', function () {
  var recipesController,
      $location;

  beforeEach(module('app'));

  beforeEach(inject(function ($controller, _$location_, DataService) {
    $location= _$location_;
    recipesController = $controller('RecipesController');
  }));

  describe('addNew function', function () {
    it('should direct the user to the recipe detail page', function () {
      $location.path('/');
      expect($location.path()).toBe('/');
      recipesController.addNew();
      expect($location.path()).toBe('/add');
    });
  });

  describe('modalShown variable', function () {
    it('should be false', function () {
      expect(recipesController.modalShown).toBe(false);
    });
  });

  describe('toggleModal function', function () {
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

  describe('deleteRecipe function', function () {
    it('should remove the recipe user wants deleted', function () {
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

      var recipe = {
        "name": "Grilled Cheese Sandwich",
        "description": "Quick to prepare and delicious chees sandwiches.",
        "category": "Appetizer/Snack",
        "prepTime": 10,
        "cookTime": 7,
        "_id": "8kutKKiHSYpGd4sW"
      };

      var secondRecipe = {
        "name": "Cabbage Salad Goodness",
        "description": "Simple, light and tasty cabbage salad.",
        "category": "Salad",
        "prepTime": 10,
        "cookTime": 60,
        "_id": "dBHEBmK8abxVorHi"
      };

      expect(recipesController.recipes.length).toEqual(3);

      recipesController.deleteRecipe(recipe);

      expect(recipesController.recipes.length).toEqual(2);

      recipesController.deleteRecipe(secondRecipe);

      expect(recipesController.recipes.length).toEqual(1);
    });
  });
});
