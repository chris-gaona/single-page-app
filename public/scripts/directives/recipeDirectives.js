/**
* @module modalDialog
*/

// immediately invoked function
(function () {
  'use strict';

  /**
  * @function recipesDirective
  * @description The container function for all the
  * modalDialog directive items
  * @return Returns the object used as the modal directive
  */
  function recipesDirective () {
    return {
      // restrict to element only
      restrict: 'E',
      // adds scope with show set to = to make it able to be
      // changed from the controller, & directive
      scope: {
        show: '='
      },
      replace: true, // Replace with the template below
      transclude: true, // I want to insert custom content inside the directive
      link: function(scope, element, attrs) {
        // creates dialogStyle as empty object
        scope.dialogStyle = {};
        // if width is passed in
        if (attrs.width)
          scope.dialogStyle.width = attrs.width;
        // if height is passed in
        if (attrs.height)
          scope.dialogStyle.height = attrs.height;
        // if hideModal button is clicked set show to false
        // to remove the modal window
        scope.hideModal = function() {
          scope.show = false;
        };
      },
      // adds template url for modal
      templateUrl: '../templates/modal.html' // See below
    };
  }

  angular.module('app')
  .directive('modalDialog', recipesDirective);
})();
