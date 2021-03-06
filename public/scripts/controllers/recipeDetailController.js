/**
* @module RecipeDetailController
* @memberof angular_module.app.RecipeDetailController
*/

// immediately invoked function
(function (angular) {
  'use strict';

  /**
  * @function recipesController
  * @description The container function for all the
  * RecipeDetailController functions
  * @param {service} DataService - Gives access to
  * DataService functions.
  * @param $routeParams - The $routeParams service allows
  * you to retrieve the current set of route parameters
  * @param $location - $location service parses the URL in
  * the browser address bar & makes the URL available to
  * your application
  */
  function recipesController ($routeParams, $location, $log, DataService) {
    // adds this to the value of vm
    var vm = this;

    // puts results from DataService.categories.data array
    // into categories variable
    vm.categories = DataService.categories.data;

    // puts results from DataService.foodItems.data array
    // into foods variable
    vm.foods = DataService.foodItems.data;

    // assigned id parameter to id variable
    vm.id = $routeParams.id;

    // initially makes editing varible to false
    vm.editing = false;

    /**
    * @function getOneRecipe
    * @description Gets one specific recipe from the server
    * to display on the details page for the user to edit
    * @param {service} DataService - Gives access to
    * DataService functions.
    * @param $routeParams - The $routeParams service allows
    * you to retrieve the current set of route parameters
    * @param $location - $location service parses the URL in
    * the browser address bar & makes the URL available to
    * your application
    */
    vm.getOneRecipe = function () {
      // if id is not undefined
      if (angular.isDefined(vm.id)) {
        // call DataService.getOne function & pass in the
        // id parameter & deal with the response
        DataService.getOne(vm.id).then(function (response) {
          // assign response to response variable
          vm.response = response;
          // assign response.data to response variable
          vm.recipe = response.data;
          // assign recipe name to name variable
          vm.name = vm.recipe.name;
          // assign description to description variable
          vm.description = vm.recipe.description;
          // assign category to category variable
          vm.category = vm.recipe.category;
          // assign prepTime to prepTime variable
          vm.prepTime = vm.recipe.prepTime;
          // assign cookTime to cookTime variable
          vm.cookTime = vm.recipe.cookTime;

          // assign ingredients array to ingredients
          // variable
          vm.ingredients = vm.recipe.ingredients;
          // assign steps array to steps variable
          vm.steps = vm.recipe.steps;
        // if error with response
        }, function (error) {
          $log.error('Error ' + error);
        });
        // editing is set to true
        vm.editing = true;
        $log.info('EDITING!');
      } else {
        // else editing is set to false
        vm.editing = false;
        $log.info('NOT EDITING!');

        // creates empty ingredient input
        vm.ingredients = [{
          foodItem: '',
          condition: '',
          amount: ''
        }];

        // creates empty step input
        vm.steps = [{
          description: ''
        }];
      }
    };

    /**
    * @function addNewRec
    * @description Adds a new empty ingredient input for the
    * user to fill out
    */
    vm.addNewRec = function () {
      // creates an empty ingredients input
      vm.ingredients.push({
        foodItem: '',
        condition: '',
        amount: ''
      });
    };

    /**
    * @function addNewStep
    * @description Adds a new empty step input for the
    * user to fill out
    */
    vm.addNewStep = function () {
      // creates an empty steps input
      vm.steps.push({
        description: ''
      });
    };

    /**
    * @function saveRecipe
    * @description Saves the recipe as a new recipe or as
    * an edited recipe if the user is just editing
    * @param {object} recipe - this is the recipe object
    * passed into saveRecipe as a paremeter to pass to the
    * server to save
    */
    vm.saveRecipe = function (recipe) {
      // assigns recipe object to recipeObject variable
      vm.recipeObject = recipe;

      // create newRecipe with an empty object & adds keys &
      // values to it below it using dot notation
      var newRecipe = {};
      newRecipe.name = vm.name;
      newRecipe.description = vm.description;
      newRecipe.category = vm.category;
      newRecipe.prepTime = vm.prepTime;
      newRecipe.cookTime = vm.cookTime;
      newRecipe.ingredients = vm.ingredients;
      newRecipe.steps = vm.steps;

      // if recipe is not undefined, which means that the
      // user is editing an existing recipe
      if (angular.isDefined(recipe)) {
        // call DataService.update & pass in the recipe id
        // as a parameter & deal with the response
        DataService.update(recipe._id, newRecipe).then(function (response) {
          if (response) {
            // log the response.data to the console
            $log.log(response.data);
            // send the user back to the home page
            $location.path('/');
          }
        // if there was an error
        }, function (error) {
          // log the error to the console
          $log.error(error.data.errors);
          // assigns the various possible errors from the
          // server to the variables below
          vm.catErrors = error.data.errors.category;
          vm.ingErrors = error.data.errors.ingredients;
          vm.nameErrors = error.data.errors.name;
          vm.stepErrors = error.data.errors.steps;
        });
      // if the user is creating a new recipe
      } else {
        // call DataService.add & pass in the new recipe &
        // deal with the response
        DataService.add(newRecipe).then(function (response) {
          // if there was a response
          if (response) {
            // log the response.data to the console
            $log.log(response.data);
            // send the user to the home page
            $location.path('/');
          } else {
            $log.warn('There was an error!');
          }
        // if there was an error
        }, function (error) {
          // log the error to the console
          $log.error(error.data.errors);
          // assigns the various possible errors from the
          // server to the variables below
          vm.catErrors = error.data.errors.category;
          vm.ingErrors = error.data.errors.ingredients;
          vm.nameErrors = error.data.errors.name;
          vm.stepErrors = error.data.errors.steps;
        });
      }
    };

    /**
    * @function checkError
    * @description Checks if there are any errors in the
    * variables specified
    * @return {boolean} return true if there is an error &
    * false if there is no error
    */
    vm.checkError = function () {
      // if there are errors in any of the following
      // variables either return true or false
      if (vm.catErrors || vm.ingErrors || vm.nameErrors || vm.stepErrors) {
        return true;
      } else {
        return false;
      }
    };

    /**
    * @function cancel
    * @description Cancels the recipe detail form & sends
    * the user back to the home page
    */
    vm.cancel = function () {
      // send the user to the home page
      $location.path('/');
    };

    /**
    * @function deleteIngr
    * @description Removes the ingredient chosen by the user * from the ingredients array
    * @param {object} ingredient - this is the ingredient
    * object passed into this function in order to remove
    * it from the ingredients array
    */
    vm.deleteIngr = function (ingredient) {
      // remove ingredient passed in from ingredients array
      vm.ingredients.splice(vm.ingredients.indexOf(ingredient), 1);
      // set modalShown to false
      vm.modalShown = false;
    };

    /**
    * @function deleteStep
    * @description Removes the step chosen by the user from
    * the steps array
    * @param {object} step - this is the step
    * object passed into this function in order to remove
    * it from the steps array
    */
    vm.deleteStep = function (step) {
      // removes steps passed in from steps array
      vm.steps.splice(vm.steps.indexOf(step), 1);
      // sets modalShown to false
      vm.modalShown = false;
    };

    // initially sets modalShown to false
    vm.modalShown = false;
    /**
    * @function toggleModal
    * @description The modal to confirm that the user wants
    * to delete an item is toggled between visible & not
    * visible
    * @param {object} item - this is the item object
    * passed into toggleModal as a paremeter
    */
    vm.toggleModal = function (item) {
      // chosenRecipe variable is set to equal the item
      // passed into the function as a parameter
      vm.chosenItem = item;
      // modalShown variable is toggled between true & false
      vm.modalShown = !vm.modalShown;
    };

    /**
    * @function checkItem
    * @description Checks if the item passed in as a
    * parameter is an ingredient or a step
    * @param {object} item - this is the item object
    * passed into checkItem as a paremeter
    * @return {boolean} Returns true if item contains the
    * key foodItem & false otherwise
    */
    vm.checkItem = function (item) {
      // if item contains the key --> foodItem return true
      // else return false
      if (angular.isUndefined(item.foodItem)) {
        return true;
      } else {
        return false;
      }
    };
  }

  angular.module('app')
  .controller('RecipeDetailController', ['$routeParams', '$location', '$log', 'DataService', recipesController]);
})(angular);
