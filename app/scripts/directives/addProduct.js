(function () {

    angular.module('inventory1App')

    .directive('mcAddProduct', ['$api',
        function ($api) {
            return {
                restrict: 'E',
                templateUrl: 'views/products/addProduct.html',
                scope: {
                    display: '=',
                    productval: '=',
                    mode: '=',
                    products: '=',
                    categories: '=',

                },
                controller: ['$scope', '$errors', '$api', 'Flash',
                    function ($scope, $errors, $api, Flash) {
                        var defaultForm = {
                            name: $scope.productval.name,
                            desc: $scope.productval.desc,
                        }
                        $scope.addCat = angular.copy(defaultForm);
                        //$scope.productForm.$setPristine();

                        $scope.submit = function (form) {
                            if (form.$invalid) {
                                $errors.modal('Please fill out all fields for product');
                                return;
                            } else {
                                $errors.message = null;
                            }

                            if ($scope.mode === 'Edit') {
                                $api.updateProduct({
                                        id: $scope.productval.id,
                                        name: $scope.productval.name,
                                        "category": {
                                            "id": $scope.productval.catId.id
                                        },
                                        price: $scope.productval.price,
                                        threshold: $scope.productval.threshold,
                                        "type": "FoodProduct"
                                    }).success(function (data) {
                                        if (data) {
                                            $api.getProducts().success(function (data) {
                                                $scope.products = data;

                                                $scope.addCat = angular.copy(defaultForm);
                                                $scope.productForm.$setPristine();
                                                $scope.productForm.$setUntouched();
                                                $scope.display = !$scope.display;
                                                Flash.create('success', 'Product edited successfully!', 'custom-class');
                                            });

                                        }
                                    })
                                    .error(function (e, h, r) {
                                        //$scope.productval = angular.copy(defaultForm);
                                        Flash.create('danger', e.errorMessage, 'custom-class');
                                    });
                            } else {
                                $scope.addProductPromise = $api.addProduct({
                                    name: $scope.productval.name,
                                    "category": {
                                        "id": $scope.productval.catId.id
                                    },
                                    price: $scope.productval.price,
                                    threshold: $scope.productval.threshold,
                                    "type": "FoodProduct"
                                }).success(function (data) {

                                    $api.getProducts().success(function (data) {
                                        $scope.products = data;
                                        var defaultForm = {
                                            name: '',
                                            desc: '',
                                        }
                                        $scope.addCat = angular.copy(defaultForm);
                                        $scope.productForm.$setPristine();
                                        $scope.productForm.$setUntouched();
                                        $scope.display = !$scope.display;
                                        Flash.create('success', 'Product added successfully!', 'custom-class');
                                    });

                                }).error(function (e, h, r) {
                                    var defaultForm = {
                                        name: '',
                                        desc: '',
                                    }

                                    $scope.productval = angular.copy(defaultForm);
                                    $scope.productForm.$setPristine();
                                    $scope.productForm.$setUntouched();
                                    Flash.create('danger', e.errorMessage, 'custom-class');
                                })

                            }

                        }

                        $scope.cancel = function () {
                            $api.getProducts().success(function (data) {
                                $scope.products = data;

                                $scope.productForm.$setPristine();
                                $scope.productForm.$setUntouched();
                                $scope.display = !$scope.display;

                            });

                        }

                        }
                ],
                controllerAs: 'addproduct',
                link: function ($scope, $el, attr, ctrl) {

                }
            };
        }
    ]);

})();
