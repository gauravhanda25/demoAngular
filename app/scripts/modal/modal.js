(function() {
    'use strict';

    angular.module('inventory1App')

    .directive('mcModal', [function() {
        return {
            restrict: 'E',
            templateUrl: function(el, attrs) {
                return '/views/modal/' + attrs.template + '.html';
            },
            scope: {
                lcTitle: '@',
                errors: '=',
                callback: '&',
                show: '=',
                modalData: '=',
                mode: '@'
            },
            link: function(scope, el, attrs) {
                var $content = angular.element(el[0].querySelector('.modal-content'));
                
                scope.$watch('show', function(newVal, oldVal) { 
                    var pageTop = window.pageYOffset;
                    $content.css({
                        top: (pageTop + 51) + 'px',
                    });

                });

                scope.close = function() {
                    var modal = angular.element(el[0].querySelector('.modal'));

                    modal.one('webkitAnimationEnd animationend', function() {
                        scope.errors.message = null;
                    });

                    scope.errors.show = false;
                }
            }
        };
    }])

})();
