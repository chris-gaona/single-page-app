'use strict';

describe('recipesController', function () {
  var recipesController;
  beforeEach(module('app'));
  beforeEach(inject(function ($controller, _$location_, DataService) {
    recipesController = $controller('RecipesController', {
      $location: _$location_
    });
  }));

  it('should be false', function () {
    expect(recipesController.modalShown).toEqual(false);
  });
});
