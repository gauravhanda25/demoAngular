(function() {

    angular.module('inventory1App')

    .directive('mcAddCategory', ['$api',
        function($api) {
            return {
                restrict: 'E',
                templateUrl: 'views/categories/addCategory.html',
                scope: {
                    display: '=',
                    catval: '=',
                    mode: '=',
                    categories: '=',

                }, 
                controller: ['$scope', '$errors', '$api','Flash',
                    function($scope, $errors, $api, Flash) {
                        var defaultForm = {
                            name: $scope.catval.name,
                            desc: $scope.catval.desc,
                        }
                        $scope.addCat = angular.copy(defaultForm);
                        //$scope.categoryForm.$setPristine();
                        
                        $scope.submit = function(form) {
                            if (form.$invalid) {
                                $errors.modal('Please fill out all fields for category');
                                return;
                            } else {
                                $errors.message = null;
                            }

                            if ($scope.mode === 'Edit') {
                                $api.updateCategory({
                                            name: $scope.catval.name,
                                            description: $scope.catval.description,
                                            id: $scope.catval.id
                                        }).success(function(data) {
                                            if(data) {
                                                $api.getCategories().success(function(data) {
                                                    $scope.categories = data;

                                                    $scope.addCat = angular.copy(defaultForm);
                                                    $scope.categoryForm.$setPristine();
                                                    $scope.categoryForm.$setUntouched();
                                                    $scope.display = !$scope.display;
                                                    Flash.create('success', 'Category edited successfully!', 'custom-class');
                                                });
                                                
                                            }
                                        })
                                    .error(function(e, h, r) {
                                        //$scope.catval = angular.copy(defaultForm);
                                        Flash.create('danger', e.errorMessage, 'custom-class');
                                    });
                            } else {
                                $scope.addCategoryPromise = $api.addCategory({
                                        name: $scope.catval.name,
                                        description: $scope.catval.description
                                    }).success(function(data) {

                                        $api.getCategories().success(function(data) {
                                            $scope.categories = data;
                                            var defaultForm = {
                                                name: '',
                                                desc: '',
                                            }
                                            $scope.addCat = angular.copy(defaultForm);
                                            $scope.categoryForm.$setPristine();
                                            $scope.categoryForm.$setUntouched();
                                            $scope.display = !$scope.display;
                                            Flash.create('success', 'Category added successfully!', 'custom-class');
                                        });

                                    }).error(function(e, h, r) {
                                        var defaultForm = {
                                            name: '',
                                            desc: '',
                                        }
                                        
                                        $scope.catval = angular.copy(defaultForm);
                                        $scope.categoryForm.$setPristine();
                                        $scope.categoryForm.$setUntouched();
                                        Flash.create('danger', e.errorMessage, 'custom-class');
                                    })

                                }

                            }

                            $scope.cancel = function() {
                                $api.getCategories().success(function(data) {
                                                    $scope.categories = data;

                                                     $scope.categoryForm.$setPristine();
                                $scope.categoryForm.$setUntouched();
                                $scope.display = !$scope.display;
                                                   
                                                });
                               
                            }

                        }
                ],
                controllerAs: 'addCategory',
                link: function($scope, $el, attr, ctrl) {

                }
            };
        }
    ]);

})();