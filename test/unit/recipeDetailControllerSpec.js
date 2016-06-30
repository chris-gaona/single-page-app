'use strict';

describe('recipeDetailController', function () {
  // variables
  var recipesController,
      DataService,
      timeout,
      q,
      scope,
      $location,
      routeParams,
      foodItems;

  beforeEach(module('app'));

  describe('', function () {
    beforeEach(inject(function ($rootScope, $controller, $timeout, $q, _DataService_, $routeParams) {
      DataService = _DataService_;
      timeout = $timeout;
      q = $q;
      routeParams = {};
      routeParams.id = 123456789;

      scope = $rootScope.$new();

      recipesController = $controller('RecipeDetailController', {
        DataService: DataService,
        $routeParams: routeParams
      });
    }));

    it('should make a call to DataService.getOne() if there is an id in the url', function () {
      expect(recipesController.id).toEqual(123456789);
    });
  });
});
