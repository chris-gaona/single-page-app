// RUN npm test IN THE CONSOLE TO RUN ALL THE TESTS
// RUN npm run createDocs IN THE CONSOLE TO CREATE JSDOC FILES

/**
* @module app
* @requires ngRoute module
* @requires ngAnimate module
* @requires exceptionOverride module
*/

// immediately invoked function
(function (angular) {
  'use strict';

  angular.module('app', ['ngRoute', 'ngAnimate', 'exceptionOverride']);

  // The Angular $routeProvider is used to configure routes for your application.

  // Three routes are configured below:
  // 1) The root of the application "/" which serves up the "Recipes" view.
  // 2) The recipe edit route "/edit/:id" which serves up the "Recipe Detail" view.
  // 3) The recipe add route "/add" which also serves up the "Recipe Detail" view.

  angular
    .module('app')
    .config(config);

  /**
  * @function config
  * @description Configuring the routes for the application
  * @param $routeProvider - Used for configuring routes
  */
  function config ($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'RecipesController',
        controllerAs: 'vm',
        templateUrl: 'templates/recipes.html',
        resolve: {
          recipes: ['DataService', function (DataService) {
            return DataService.getAll();
          }],
          categories: ['DataService', function (DataService) {
            return DataService.allCategories();
          }]
        }
      })
      .when('/edit/:id', {
        controller: 'RecipeDetailController',
        controllerAs: 'vm',
        templateUrl: 'templates/recipe-detail.html',
        resolve: {
          categories: ['DataService', function (DataService) {
            return DataService.allCategories();
          }],
          foodItems: ['DataService', function (DataService) {
            return DataService.foodItems();
          }]
        }
      })
      .when('/add', {
        controller: 'RecipeDetailController',
        controllerAs: 'vm',
        templateUrl: 'templates/recipe-detail.html',
        resolve: {
          categories: ['DataService', function (DataService) {
            return DataService.allCategories();
          }],
          foodItems: ['DataService', function (DataService) {
            return DataService.foodItems();
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }
})(angular);
