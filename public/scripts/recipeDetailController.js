(function () {
  'use strict';

  function recipesController (DataService, $routeParams, $location, foodItems) {
    var vm = this;

    vm.categories = DataService.categories.data;

    vm.foods = foodItems;

    if ($routeParams.id !== undefined) {
      DataService.getOne($routeParams.id).then(function (response) {
        vm.recipe = response.data;
        vm.name = vm.recipe.name;
        vm.description = vm.recipe.description;
        vm.category = vm.recipe.category;
        vm.prepTime = vm.recipe.prepTime;
        vm.cookTime = vm.recipe.cookTime;

        vm.ingredients = vm.recipe.ingredients;
        vm.steps = vm.recipe.steps;

        vm.editing = true;
        console.log('EDITING!');
      }, function (response) {
        console.log('Error ' + response);
      });
    } else {
      vm.editing = false;
      console.log('NOT EDITING!');

      vm.ingredients = [{
        foodItem: '',
        condition: '',
        amount: ''
      }];

      vm.steps = [{
        description: ''
      }];
    }

    vm.addNewRec = function () {
      vm.ingredients.push({
        foodItem: '',
        condition: '',
        amount: ''
      });
    };

    vm.addNewStep = function () {
      vm.steps.push({
        description: ''
      });
    };

    vm.saveRecipe = function (recipe) {
      var newRecipe = {};
      newRecipe.name = vm.name;
      newRecipe.description = vm.description;
      newRecipe.category = vm.category;
      newRecipe.prepTime = vm.prepTime;
      newRecipe.cookTime = vm.cookTime;
      newRecipe.ingredients = vm.ingredients;
      newRecipe.steps = vm.steps;
      console.log(newRecipe);

      if (recipe !== undefined) {
        DataService.update(recipe._id, newRecipe);
      } else {
        DataService.add(newRecipe);
      }

      $location.path('/');
    };

    vm.cancel = function () {
      $location.path('/');
    };

    vm.deleteIngr = function (ingredient) {
      vm.ingredients.splice(vm.ingredients.indexOf(ingredient), 1);
    };

    vm.deleteStep = function (step) {
      vm.steps.splice(vm.steps.indexOf(step), 1);
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
