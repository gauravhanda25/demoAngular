(function() {
    'use strict';

    angular.module('inventory1App')

    .directive('mcViewport', [function() {
        return {
            restrict: 'A',
            transclude: true,
            template: '<div id="viewport" ng-transclude></div>',
            controller: 'ViewportController',
            controllerAs: 'viewport',
            link: function(scope, el, attrs, ctrl) {
                var $content;

                /* Uses controller to gain access via $root to $rootScope for view animation controls */
                ctrl.$root.$on('$stateChangeStart', function(ev, toState, toParams, fromState, fromParams) {
                    $content = angular.element(document.querySelector('#content'));

                    if (!fromState.abstract) {
                        ctrl.hasInitalized = true;

                        if (fromState.name !== 'detail' && toState.name !== 'detail') {
                            if (toState.name === 'home') {
                                ctrl.animationType = 'home';
                            } else {
                                ctrl.animationType = 'default';
                            }
                        }


                        $content.on('webkitAnimationEnd animationend webkitTransitionEnd transitionend', function(e) {
                            //Have to reselect the element again because of angular replacing/manipulating it at same time
                            angular.element(document.querySelector('#content')).removeClass('slideFade slide');
                        });
                    }
                });
            }
        };
    }])

    .controller('ViewportController', ['$rootScope', '$errors',
        function($rootScope, $errors) {
            var _this = this;
            console.log($errors.show);
            angular.extend(this, {
                hasInitalized: false,
                $root: $rootScope,
                $errors: $errors,
                setTitle: function(title) {
                    document.title = document.title.split('|')[0] + '| ' + title;
                }
            });
        }
    ])

})();
