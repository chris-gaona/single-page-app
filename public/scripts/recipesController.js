(function () {
  'use strict';

  function recipesController (DataService, $location) {
    var vm = this;

    // As a user, I should be able to select a category on the "Recipes" list screen to filter the list of recipes by that selected category.
    vm.categories = DataService.categories.data;

    // As a user, I should be able to click on a recipe row or on the row's "Edit" link to view the details for that recipe using the "Recipe Detail" screen.
    vm.recipes = DataService.recipes.data;

    // TODO: As a user, I should be able to click on a recipe row's "Delete" link to delete that recipe.

    // As a user, I should be able to click the "Add Recipe" button to add a new recipe using the "Recipe Detail" screen.
    vm.addNew = function () {
      $location.path('/add');
    };

  }

  angular.module('app')
  .controller('RecipesController', ['DataService', '$location', recipesController]);

})();