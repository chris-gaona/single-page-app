(function () {
  'use strict';

  function recipesController (DataService, $routeParams, $location, foodItems) {
    var vm = this;

    vm.categories = DataService.categories.data;

    vm.foods = foodItems;

    if ($routeParams.id !== undefined) {
      DataService.getOne($routeParams.id).then(function (response) {
        console.log(response.data);
        vm.recipe = response.data;
        vm.name = vm.recipe.name;
        vm.description = vm.recipe.description;
        vm.category = {"name":vm.recipe.category};
        vm.prepTime = vm.recipe.prepTime;
        vm.cookTime = vm.recipe.cookTime;

        vm.ingredients = vm.recipe.ingredients;
        vm.steps = vm.recipe.steps;

        // vm.foodItem = {"name":vm.recipe.ingredients[0].foodItem};

        vm.editing = true;
        console.log('EDITING!');
      }, function (response) {
        console.log('Error ' + response);
      });
    } else {
      vm.editing = false;
      console.log('NOT EDITING!');

    }

    vm.saveRecipe = function () {
      var newRecipe = {};
      newRecipe.name = vm.name;
      newRecipe.description = vm.description;
      newRecipe.category = vm.category.name;
      newRecipe.prepTime = vm.prepTime;
      newRecipe.cookTime = vm.cookTime;
      newRecipe.ingredients = [];
      var ingredientItem = {
        foodItem: vm.selected.name,
        condition: vm.condition,
        amount: vm.amount
      }
      newRecipe.ingredients.push(ingredientItem);
      console.log(newRecipe);
    };

    vm.cancel = function () {
      $location.path('/');
    };


    /*
    As a user, when adding or updating a recipe, I can provide the following values:
    Name (text box)
    Description (multi-line text box)
    Category (select list)
    Prep Time (text box)
    Cook Time (text box)

    As a user, I should be able to add one or more ingredients and steps to a recipe.

    As a user, when adding an ingredient to a recipe, I can provide the following values:
    Item (select list)
    Condition (text box)
    Quantity (text box)

    As a user, when adding a step to a recipe, I can provide the following values:
    Description (text box)

    As a user, I should be able to see any errors that the REST API returns when I save a recipe.
    */
  }

  angular.module('app')
  .controller('RecipeDetailController', ['DataService', '$routeParams', '$location', 'foodItems', recipesController]);
})();
