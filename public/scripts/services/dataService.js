/**
* @module DataService
* @memberof angular_module.app.DataService
*/

// immediately invoked function
(function () {
  'use strict';

  /**
  * @function apiRoutes
  * @description The container function for all the
  * DataService functions
  * @param $http - The $http service is a core Angular
  * service that facilitates communication with the remote
  * HTTP servers via the browser's XMLHttpRequest object or
  * via JSONP.
  */
  function apiRoutes ($http, $log) {
    // creates apiRoutes object & adds recipes, categories, &
    // foodItems empty arrays
    var apiRoutes = {
      recipes: [],
      categories: [],
      foodItems: []
    };

    /**
    * @function getAll
    * @description /api/recipes - GET - Gets all of the
    * recipes.
    * @return Returns response from server request to
    * /api/recipes
    */
    apiRoutes.getAll = function () {
      return $http.get('/api/recipes').then(function successCallback (response) {
        angular.copy(response, apiRoutes.recipes);
      }, function errorCallback (response, status) {
        $log.error('Error ' + response + status);
      });
    };

    /**
    * @function oneCategory
    * @description /api/recipes?category={category} - GET -
    * Gets all of the recipes for the specified category.
    * @return Returns response from server request to
    * /api/recipes?category={category}
    */
    apiRoutes.oneCategory = function () {
      return $http.get('/api/recipes?category={category}').then(function successCallback (response) {
        $log.log(response);
      }, function errorCallback (response, status) {
        $log.error('Error ' + response + status);
      });
    };

    /**
    * @function getOne
    * @description /api/recipes/{id} - GET - Gets the recipe
    * for the specified ID.
    * @return Returns response from server request to
    * /api/recipes/{id}
    */
    apiRoutes.getOne = function (id) {
      return $http.get('/api/recipes/' + id);
    };

    /**
    * @function update
    * @description /api/recipes/{id} - PUT - Updates the recipe for the specified ID.
    * @return Returns response from server request to
    * /api/recipes/{id}
    */
    apiRoutes.update = function (id, recipe) {
      return $http.put('/api/recipes/' + id, recipe);
    };

    /**
    * @function add
    * @description /api/recipes - POST - Adds a recipe.
    * @return Returns response from server request to
    * /api/recipes
    */
    apiRoutes.add = function (recipe) {
      return $http.post('/api/recipes', recipe);
    };

    /**
    * @function remove
    * @description /api/recipes/{id} - DELETE - Deletes the
    * recipe for the specified ID.
    * @return Returns response from server request to
    * /api/recipes/{id}
    */
    apiRoutes.remove = function (id) {
      return $http.delete('/api/recipes/' + id);
    };

    /**
    * @function allCategories
    * @description /api/categories - GET - Gets all of the
    * categories.
    * @return Returns response from server request to
    * /api/categories
    */
    apiRoutes.allCategories = function () {
      return $http.get('/api/categories').then(function successCallback (response) {
        angular.copy(response, apiRoutes.categories);
      }, function errorCallback (response, status) {
        $log.error('Error ' + response + status);
      });
    };

    /**
    * @function foodItems
    * @description /api/fooditems - GET - Gets all of the
    * food items.
    * @return Returns response from server request to
    * /api/fooditems
    */
    apiRoutes.foodItems = function () {
      return $http.get('/api/fooditems').then(function successCallback (response) {
        angular.copy(response, apiRoutes.foodItems);
      }, function errorCallback (response, status) {
        $log.error('Error ' + response + status);
      });
    };

    // return apiRoutes functions
    return apiRoutes;
  }

  // --------------------------------------
  // ANGULAR
  // --------------------------------------
  angular.module('app')
  .factory('DataService', ['$http', '$log', apiRoutes]);
})();
