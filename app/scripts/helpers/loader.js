(function() {
'use strict';

angular.module('inventory1App')

.directive('mcLoading', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        scope: {
            lcLoading: '='
        },
        link: function(scope, element, attrs) {
            var text = element[0].innerHTML;

            function removeSlide($el, text) {
                $el.html(text).removeClass('btn-loader disabled');
            }

            scope.$watch('lcLoading', function(newValue) {
                if (newValue && angular.isObject(newValue)) {
                    var $el = angular.element(element),
                        loader = '<div class="spinner">' +
                        '<div class="bounce1"></div>' +
                        '<div class="bounce2"></div>' +
                        '<div class="bounce3"></div></div>';

                    $el.addClass('btn-loader disabled').html(loader);

                    newValue.then(function(data) {
                        removeSlide($el, text);
                    }, function() {
                        removeSlide($el, text);
                    });
                }
            });
        }
    };
}]);

})();
