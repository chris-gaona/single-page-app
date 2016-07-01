(function () {
  'use strict';

  function exceptionHandler () {
    return function(exception, cause) {
        exception.message;
        alert(exception.message);
        // throw exception;
    };
  }

  angular.module('exceptionOverride', []).factory('$exceptionHandler', exceptionHandler);
})();
