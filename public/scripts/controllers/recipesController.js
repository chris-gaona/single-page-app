/**
* @module RecipesController
* @memberof angular_module.app.RecipesController
*/

// immediately invoked function
(function () {
  'use strict';

  /**
  * @function recipesController
  * @description The container function for all the
  * RecipesController functions
  * @param {service} DataService - Gives access to
  * DataService functions.
  * @param $location - $location service parses the URL in
  * the browser address bar & makes the URL available to your
  * application
  */
  function recipesController (DataService, $location, $log) {
    // adds this to the value of vm
    var vm = this;

    // used for testing $exceptionHandler
    // var x = n + 1;

    // user can select a category on the "Recipes" list
    // screen to filter the list of recipes by that selected // category
    vm.categories = DataService.categories.data;

    // user can click on a recipe row or on the row's "Edit"
    // link to view the details for that recipe using the
    // "Recipe Detail" screen.
    vm.recipes = DataService.recipes.data;

    /**
    * @function deleteRecipe
    * @description The user can click on a recipe row's
    * "Delete" link to delete that recipe.
    * @param {object} recipe - this is the recipe object
    * passed into deleteRecipe as a paremeter to pass to the
    * server to delete
    */
    vm.deleteRecipe = function (recipe) {
      // calls DataService.remove function & passes in the
      // recipe id & then deals with the response
      DataService.remove(recipe._id).then(function (response) {
        // log a useful string to the console
        $log.info('Recipe Successfully Deleted!');
        // change modalShown variable to false
        vm.modalShown = false;
        // put response from server in response variable
        vm.response = response;
      // if there is an error
      }, function (error) {
        // log the error to the console
        $log.error('Error ' + error);
      });

      // remove the recipe passed in from the recipes array
      vm.recipes.splice(vm.recipes.indexOf(recipe), 1);
    };

    /**
    * @function addNew
    * @description The user is able to click the "Add Recipe"
    * button to add a new recipe using the "Recipe Detail"
    * screen.
    */
    vm.addNew = function () {
      // changes angular apps location to /add route
      $location.path('/add');
    };

    // Initially sets the modalShown variable to false
    vm.modalShown = false;
    /**
    * @function toggleModal
    * @description The modal to confirm that the user wants
    * to delete a recipe is toggled between visible & not
    * visible
    * @param {object} recipe - this is the recipe object
    * passed into deleteRecipe as a paremeter to pass to the
    * server
    */
    vm.toggleModal = function (recipe) {
      // chosenRecipe variable is set to equal the recipe
      // passed into the function as a parameter
      vm.chosenRecipe = recipe;
      // modalShown variable is toggled between true & false
      vm.modalShown = !vm.modalShown;
    };
  }

  angular.module('app')
  .controller('RecipesController', ['DataService', '$location', '$log', recipesController]);
})();
