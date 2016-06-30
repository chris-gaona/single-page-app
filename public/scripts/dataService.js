(function () {
  'use strict';

  // Add service methods that call the following API methods:
  function apiRoutes ($http) {
    var apiRoutes = {
      recipes: [],
      categories: [],
      foodItems: []
    };

    // /api/recipes - GET - Gets all of the recipes.
    apiRoutes.getAll = function () {
      return $http.get('/api/recipes').then(function successCallback (response) {
        angular.copy(response, apiRoutes.recipes);
      }, function errorCallback (response, status) {
        console.log('Error ' + response + status);
        // TODO: add error message for UI
      });
    };

    // /api/recipes?category={category} - GET - Gets all of the recipes for the specified category.
    apiRoutes.oneCategory = function () {
      return $http.get('/api/recipes?category={category}').then(function successCallback (response) {
        console.log(response);
        // TODO: add message
      }, function errorCallback (response, status) {
        console.log('Error ' + response + status);
        // TODO: add error message for UI
      });
    };

    // /api/recipes/{id} - GET - Gets the recipe for the specified ID.
    apiRoutes.getOne = function (id) {
      return $http.get('/api/recipes/' + id);
    };

    // /api/recipes/{id} - PUT - Updates the recipe for the specified ID.
    apiRoutes.update = function (id, recipe) {
      return $http.put('/api/recipes/' + id, recipe);
    };

    // /api/recipes - POST - Adds a recipe.
    apiRoutes.add = function (recipe) {
      return $http.post('/api/recipes', recipe);
    };

    // /api/recipes/{id} - DELETE - Deletes the recipe for the specified ID.
    apiRoutes.remove = function (id) {
      return $http.delete('/api/recipes/' + id);
    };

    // /api/categories - GET - Gets all of the categories.
    apiRoutes.allCategories = function () {
      return $http.get('/api/categories').then(function successCallback (response) {
        angular.copy(response, apiRoutes.categories);
      }, function errorCallback (response, status) {
        console.log('Error ' + response + status);
        // TODO: add error message for UI
      });
    };

    // /api/fooditems - GET - Gets all of the food items.
    apiRoutes.foodItems = function () {
      return $http.get('/api/fooditems').then(function successCallback (response) {
        angular.copy(response, apiRoutes.foodItems);
      }, function errorCallback (response, status) {
        console.log('Error ' + response + status);
        // TODO: add error message for UI
      });
    };

    return apiRoutes;
  }

  //--------------------------------------
  //ANGULAR
  //--------------------------------------
  angular.module('app')
  .service('DataService', ['$http', apiRoutes]);

})();
