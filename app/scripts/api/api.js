(function() {
    'use strict';

    angular.module('inventory1App')

    .service('$api', ['$http', '$sessionStorage', '$apiConfig', function($http, $sessionStorage, $apiConfig) {
        var _this = this;

        angular.extend(this, {
            headers: {
                authorization: true    //$sessionStorage.user && $sessionStorage.user.Authorization ? $sessionStorage.user.Authorization : null
            },
            login: function(params) {
                return $http($apiConfig.login(params));
            },
            logout: function() {
                return $http($apiConfig.logout(this.headers.authorization));
            },
            addMember: function(params) {
                return $http($apiConfig.addMember(params, this.headers.authorization));
            },
            getEmployees: function(params) {
                return $http($apiConfig.getEmployees(params));
            },
            sendMessage: function(params) {
                return $http($apiConfig.sendMessage(params, this.headers.authorization));
            },
            deleteCategory: function(catName) {
                return $http($apiConfig.deleteCategory(this.headers.authorization, catName));
            },
            deleteEmployee: function(empId) {
                return $http($apiConfig.deleteEmployee(this.headers.authorization, empId));
            },
            updateCategory: function(params) {
                return $http($apiConfig.updateCategory(params, this.headers.authorization));
            },
            addCategory: function(params) {
                return $http($apiConfig.addCategory(params, this.headers.authorization));
            },
            addEmployee: function(params) {
                return $http($apiConfig.addEmployee(params, this.headers.authorization));
            },
            updateEmployee: function(params) {
                return $http($apiConfig.updateEmployee(params));
            },
            getCategories: function(params) {
                return $http($apiConfig.getCategories(params, this.headers.authorization));
            },
            getProducts: function(params) {
                return $http($apiConfig.getProducts(params, this.headers.authorization));
            }
            ,
            addProduct: function(params) {
                return $http($apiConfig.addProduct(params, this.headers.authorization));
            },
            updateProduct: function(params) {
                return $http($apiConfig.updateProduct(params, this.headers.authorization));
            },
            deleteProduct: function(pId) {
                return $http($apiConfig.deleteProduct(this.headers.authorization, pId));
            },
        });
    }])

})();
