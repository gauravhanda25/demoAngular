'use strict';

/**
 * @ngdoc overview
 * @name inventory1App
 * @description
 * # inventory1App
 *
 * Main module of the application.
 */
var app = angular.module('inventory1App', ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'ngStorage', "flash"]);

app.config(function($routeProvider, $httpProvider) {

  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common["X-Requested-With"];
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
  $httpProvider.defaults.headers.common["Accept"] = "application/json";
  $httpProvider.defaults.headers.common["Content-Type"] = "application/json";


  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'login',
      title: 'Login',
      resolve: {
        auth: ["$q", "authService",
          function($q, authService) {
            var userInfo = authService.getUserInfo();

            if (userInfo) {
              return $q.when(userInfo);
            } else {
              return $q.reject({
                authenticated: false
              });
            }
          }
        ]
      }
    })
    .when('/dashboard', {
      templateUrl: 'views/dashboard.html',
      controller: 'DashboardCtrl',
      title: 'Dashboard',
      controllerAs: 'dash'
    })
    .when('/categories', {
      templateUrl: 'views/categories/category.html',
      controller: 'CategoryCtrl',
      title: 'Category',
      controllerAs: 'category'
    })
    .when('/products', {
      templateUrl: 'views/products/product.html',
      controller: 'ProductCtrl',
      title: 'Product',
      controllerAs: 'product'
    })
      .when('/employees', {
      templateUrl: 'views/employees/employee.html',
      controller: 'EmployeeCtrl',
      title: 'Employee',
      controllerAs: 'employee'
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        if (current.hasOwnProperty('$$route')) {
            console.log(current.$$route.title);
            $rootScope.title = current.$$route.title;
        }
    });
}]);

app.factory("authService", function($http, $q, $window) {
  var userInfo = {};

  userInfo.getUserInfo = function() {
    userInfo = {
      name: 'admin',
      role: 'admin'
    };
    return userInfo;
  }
  return userInfo;
});
