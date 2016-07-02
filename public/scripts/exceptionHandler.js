(function () {
  'use strict';

  /**
  * @function exceptionHandler
  * @description Creates an alert window message to the user saying what the
  * error is
  * @return {alert} Returns an alert message to the user specifying the error
  */
  function exceptionHandler () {
    return function (exception, cause) {
      exception.message;
      alert(exception.message);
    };
  }

  angular.module('exceptionOverride', []).factory('$exceptionHandler', exceptionHandler);
})();
