(function () {
  'use strict';

  function recipesController (DataService) {
    var vm = this;

    // As a user, I should be able to select a category on the "Recipes" list screen to filter the list of recipes by that selected category.
    vm.categories = DataService.categories.data;
        // DataService.allCategories().then(function (response) {
        //   vm.categories = response.data;
        //   console.log(vm.categories);
        // }, function (response, status) {
        //   console.log('Error ' + response + status);
        // });

    /*
    As a user, I should be able to click on a recipe row or on the row's "Edit" link to view the details for that recipe using the "Recipe Detail" screen.

    As a user, I should be able to click on a recipe row's "Delete" link to delete that recipe.

    As a user, I should be able to click the "Add Recipe" button to add a new recipe using the "Recipe Detail" screen.
    */

  }

  angular.module('app')
  .controller('RecipesController', ['DataService', recipesController]);

})();
