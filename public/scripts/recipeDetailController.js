(function () {
  'use strict';

  function recipesController (DataService, $routeParams, $location) {
    var vm = this;

    vm.categories = DataService.categories.data;

    vm.foods = DataService.foodItems.data;

    vm.id = $routeParams.id;

    vm.editing = false;

    vm.getOneRecipe = function () {
      if (vm.id !== undefined) {
        DataService.getOne(vm.id).then(function (response) {
          vm.response = response;
          vm.recipe = response.data;
          vm.name = vm.recipe.name;
          vm.description = vm.recipe.description;
          vm.category = vm.recipe.category;
          vm.prepTime = vm.recipe.prepTime;
          vm.cookTime = vm.recipe.cookTime;

          vm.ingredients = vm.recipe.ingredients;
          vm.steps = vm.recipe.steps;
        }, function (response) {
          console.log('Error ' + response);
        });
        vm.editing = true;
        console.log('EDITING!');
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
    };

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
      vm.recipeObject = recipe;

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
        DataService.update(recipe._id, newRecipe).then(function (response) {
          if (response) {
            console.log(response.data);
            $location.path('/');
          }
        }, function (response) {
          console.log(response.data.errors);
          vm.catErrors = response.data.errors.category;
          vm.ingErrors = response.data.errors.ingredients;
          vm.nameErrors = response.data.errors.name;
          vm.stepErrors = response.data.errors.steps;
        });
      } else {
        DataService.add(newRecipe).then(function (response) {
          if (response) {
            console.log(response.data);
            $location.path('/');
          } else {
            console.log('There was an error!');
          }
        }, function (response) {
          console.log(response.data.errors);
          vm.catErrors = response.data.errors.category;
          vm.ingErrors = response.data.errors.ingredients;
          vm.nameErrors = response.data.errors.name;
          vm.stepErrors = response.data.errors.steps;
        });
      }
    };

    vm.checkError = function () {
      if (vm.catErrors || vm.ingErrors || vm.nameErrors || vm.stepErrors) {
        return true;
      } else {
        return false;
      }
    };

    vm.cancel = function () {
      $location.path('/');
    };

    vm.deleteIngr = function (ingredient) {
      vm.ingredients.splice(vm.ingredients.indexOf(ingredient), 1);
      vm.modalShown = false;
    };

    vm.deleteStep = function (step) {
      vm.steps.splice(vm.steps.indexOf(step), 1);
      vm.modalShown = false;
    };

    vm.modalShown = false;
    vm.toggleModal = function(item) {
      vm.chosenItem = item;
      vm.modalShown = !vm.modalShown;
    };

    vm.checkItem = function (item) {
      console.log(item);
      if (item.foodItem === undefined) {
        return true;
      } else {
        return false;
      }
    };
  }

  angular.module('app')
  .controller('RecipeDetailController', ['DataService', '$routeParams', '$location', recipesController]);
})();
