(function () {
  'use strict';

  function recipesController (DataService, $location) {
    var vm = this;

    // used for testing $exceptionHandler
    // var x = n + 1;

    // As a user, I should be able to select a category on the "Recipes" list screen to filter the list of recipes by that selected category.
    vm.categories = DataService.categories.data;

    // As a user, I should be able to click on a recipe row or on the row's "Edit" link to view the details for that recipe using the "Recipe Detail" screen.
    vm.recipes = DataService.recipes.data;

    // TODO: As a user, I should be able to click on a recipe row's "Delete" link to delete that recipe.
    vm.deleteRecipe = function (recipe) {
      DataService.remove(recipe._id).then(function (response) {
        console.log('Recipe Successfully Deleted!');
        vm.modalShown = false;
        vm.response = response;
      }, function (error) {
        console.log('Error ' + error);
      });

      vm.recipes.splice(vm.recipes.indexOf(recipe), 1);
    };

    // As a user, I should be able to click the "Add Recipe" button to add a new recipe using the "Recipe Detail" screen.
    vm.addNew = function () {
      $location.path('/add');
    };

    vm.modalShown = false;
    vm.toggleModal = function(recipe) {
      vm.chosenRecipe = recipe;
      vm.modalShown = !vm.modalShown;
    };
  }

  angular.module('app')
  .controller('RecipesController', ['DataService', '$location', recipesController]);

})();
