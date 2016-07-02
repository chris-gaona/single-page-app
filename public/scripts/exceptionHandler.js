(function () {
  'use strict';

  function exceptionHandler () {
    return function (exception, cause) {
      exception.message;
      alert(exception.message);
    };
  }

  angular.module('exceptionOverride', []).factory('$exceptionHandler', exceptionHandler);
})();
