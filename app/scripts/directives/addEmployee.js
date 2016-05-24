(function () {

    angular.module('inventory1App')

    .directive('mcAddEmployee', ['$api',
        function ($api) {
            return {
                restrict: 'E',
                templateUrl: 'views/employees/addEmployee.html',
                scope: {
                    display: '=',
                    empval: '=',
                    mode: '=',
                    employees: '=',

                },
                controller: ['$scope', '$errors', '$api', 'Flash',
                    function ($scope, $errors, $api, Flash) {
                        var defaultForm = {
                            "userName": $scope.empval.userName,
                            "firstName": $scope.empval.firstName,
                            "lastName": $scope.empval.lastName,
                            "email": $scope.empval.email,
                            "mobile": $scope.empval.mobile,
                            "roles": [
                                {
                                    "roleId": "3"
                                }
                            ]
                        }
                        $scope.addEmp = angular.copy(defaultForm);
                        //$scope.employeeForm.$setPristine();

                        $scope.submit = function (form) {
                            if (form.$invalid) {
                                $errors.modal('Please fill out all fields for employee');
                                return;
                            } else {
                                $errors.message = null;
                            }

                            if ($scope.mode === 'Edit') {
                                $api.updateEmployee({
                                        "id": $scope.empval.id,
                                        "userName": $scope.empval.userName,
                                        "firstName": $scope.empval.firstName,
                                        "lastName": $scope.empval.lastName,
                                        "email": $scope.empval.email,
                                        "mobile": $scope.empval.mobile,
                                        "enabled": true,
                                        "locked": false,
                                        "roles": [
                                            {
                                                "roleId": "3"
                                            }
                                        ]
                                    }).success(function (data) {
                                        if (data) {
                                            var defaultJson = {
                                                "pagination": {
                                                    "page": "0",
                                                    "size": "10"
                                                },
                                                "sorters": [
                                                    {
                                                        "property": "firstName",
                                                        "direction": "DESC"
                                                }]
                                            }
                                            $api.getEmployees(defaultJson).success(function (data) {
                                                $scope.employees = data.list;
                                                $scope.employeeForm.$setPristine();
                                                $scope.employeeForm.$setUntouched();
                                                $scope.display = !$scope.display;
                                                Flash.create('success', 'employee added successfully!', 'custom-class');
                                            });
                                        }
                                    })
                                    .error(function (e, h, r) {
                                        //$scope.empval = angular.copy(defaultForm);
                                        Flash.create('danger', e.errorMessage, 'custom-class');
                                    });
                            } else {
                                $scope.addemployeePromise = $api.addEmployee({
                                    userName: $scope.empval.userName,
                                    firstName: $scope.empval.firstName,
                                    lastName: $scope.empval.lastName,
                                    email: $scope.empval.email,
                                    mobile: $scope.empval.mobile,
                                    "enabled": true,
                                    "locked": false,
                                    "roles": [
                                        {
                                            "roleId": "3"
                                    }]
                                }).success(function (data) {

                                    var defaultJson = {
                                        "pagination": {
                                            "page": "0",
                                            "size": "10"
                                        },
                                        "sorters": [
                                            {
                                                "property": "firstName",
                                                "direction": "DESC"
                                                }]
                                    }

                                    $api.getEmployees(defaultJson).success(function (data) {
                                        $scope.employees = data.list;
                                        $scope.employeeForm.$setPristine();
                                        $scope.employeeForm.$setUntouched();
                                        $scope.display = !$scope.display;
                                        Flash.create('success', 'employee added successfully!', 'custom-class');
                                    });



                                }).error(function (e, h, r) {
                                    var defaultForm = {
                                        name: '',
                                        desc: '',
                                    }

                                    $scope.empval = angular.copy(defaultForm);
                                    $scope.employeeForm.$setPristine();
                                    $scope.employeeForm.$setUntouched();
                                    Flash.create('danger', e.errorMessage, 'custom-class');
                                })

                            }

                        }

                        $scope.cancel = function () {
                            $api.getCategories().success(function (data) {
                                $scope.categories = data;

                                $scope.employeeForm.$setPristine();
                                $scope.employeeForm.$setUntouched();
                                $scope.display = !$scope.display;

                            });

                        }

                        }
                ],
                controllerAs: 'addemployee',
                link: function ($scope, $el, attr, ctrl) {

                }
            };
        }
    ]);

})();
