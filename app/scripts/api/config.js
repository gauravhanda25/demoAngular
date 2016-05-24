(function () {
    'use strict';

    var url = 'http://52.90.60.26:8080/';
    angular.module('inventory1App')

    .service('$apiConfig', [function () {
        angular.extend(this, {
            login: function (params) {
                return {
                    method: 'POST',
                    url: '/User.svc/Login',
                    data: params
                }
            },
            logout: function (params) {
                return {
                    method: 'GET',
                    url: '/User.svc/Logout',
                    headers: {
                        Authorization: params
                    }
                }
            },

            getEmployees: function (params) {
                return {
                    method: 'POST',
                    url: url + 'mobcat/secure/user/search',
                    data: params
                }
            },
            getCategories: function (params) {
                return {
                    method: 'GET',
                    url: url + 'mobcat/secure/category/getAll',
                }
            },
            addCategory: function (params) {
                return {
                    method: 'POST',
                    url: url + 'mobcat/secure/category/add',
                    data: params
                }
            },
            addEmployee: function (params) {
                return {
                    method: 'POST',
                    url: url + 'mobcat/secure/registration/',
                    data: params
                }
            },
            updateCategory: function (params) {
                return {
                    method: 'PUT',
                    url: url + 'mobcat/secure/category/update',
                    data: params
                }
            },

            deleteCategory: function (auth, catName) {
                return {
                    method: 'DELETE',
                    headers: 'Access-Control-Allow-Origin: true',
                    url: url + 'mobcat/secure/category/delete/' + catName,
                    headers: {
                        Authorization: auth
                    }
                }
            },

            deleteEmployee: function (auth, empId) {
                return {
                    method: 'DELETE',
                    headers: 'Access-Control-Allow-Origin: true',
                    url: url + 'mobcat/secure/user/delete/' + empId,
                    headers: {
                        Authorization: auth
                    }
                }
            },

            updateEmployee: function (params) {
                return {
                    method: 'PUT',
                    url: url + 'mobcat/secure/user/update',
                    data: params
                }
            },
            getProducts: function () {
                return {
                    method: 'GET',
                    url: url + 'mobcat/secure/foodProduct/all',
                }
            },
            deleteProduct: function (auth, pId) {
                return {
                    method: 'DELETE',
                    headers: 'Access-Control-Allow-Origin: true',
                    url: url + 'mobcat/secure/foodProduct/delete/' + pId,
                    headers: {
                        Authorization: auth
                    }
                }
            },

            updateProduct: function (params) {
                return {
                    method: 'PUT',
                    url: url + 'mobcat/secure/foodProduct/update',
                    data: params
                }
            },
            addProduct: function (params) {
                return {
                    method: 'POST',
                    url: url + 'mobcat/secure/foodProduct/add',
                    data: params
                }
            }


        });
    }])

})();
