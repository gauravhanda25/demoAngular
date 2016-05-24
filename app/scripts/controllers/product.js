'use strict';

angular.module('inventory1App')
    .controller('ProductCtrl', ['$scope', '$api', '$errors',
    function ($scope, $api, $errors) {

            var defaultForm = {
                "name": "",
                "category": {
                    "id": ""
                },
                "price": "",
                "threshold": "",
                "type": ""
            }

            $scope.productval = angular.copy(defaultForm);
            $scope.formVisible = false;

            $api.getProducts().success(function (data) {
                $scope.products = data;
            });

            $api.getCategories().success(function (data) {
                $scope.categories = data;
            });

            $scope.showDeleteConfirmation = function (ev, product) {
                $scope.productToDelete = product;
                $scope.showConfirmation = true;
                $scope.loading = true;
                ev.preventDefault();
            }

            $scope.showDeleteConfirmationCallback = function (accepted) {
                $scope.showConfirmation = false;

                if (accepted) {
                    var index = $scope.products.indexOf($scope.productToDelete);
                    $scope.products.splice(index, 1);

                    $api.deleteProduct($scope.productToDelete.id).success(function (data) {
                        Flash.create('success', 'Product deleted successfully!', 'custom-class');
                        $scope.loading = false;
                    })

                } else {
                    $scope.loading = false;
                }
            };

            $scope.editProduct = function (product) {
                $scope.mode = 'Edit';
                $scope.productval = product;
                $scope.formVisible = !$scope.formVisible;
            }
    }
  ]);
