'use strict';

angular.module('inventory1App')
    .controller('EmployeeCtrl', ['$scope', '$api', '$errors',
    function ($scope, $api, $errors) {

            var defaultJson = {
                "pagination": {
                    "page": "0",
                    "size": "5"
                },
                "sorters": [
                    {
                        "property": "firstName",
                        "direction": "DESC"
                        }
]
            }

            var defaultForm = {
                "userName": "",
                "password": "",
                "firstName": "",
                "lastName": "",
                "email": "",
                "mobile": "",
                "enabled": true,
                "locked": false,
                "roles": [
                    {
                        "roleId": "3"
                    }
]
            }

            $scope.empval = angular.copy(defaultJson);
            $scope.formVisible = false;

            $api.getEmployees(defaultJson).success(function (data) {
                $scope.employees = data.list;
            });

            $scope.showDeleteConfirmation = function (ev, cat) {
                $scope.catToDelete = cat;
                $scope.showConfirmation = true;
                $scope.loading = true;
                ev.preventDefault();
            }

            $scope.showDeleteConfirmationCallback = function (accepted) {
                $scope.showConfirmation = false;

                if (accepted) {
                    var index = $scope.employees.indexOf($scope.catToDelete);
                    $scope.employees.splice(index, 1);

                    $api.deleteEmployee($scope.catToDelete.id).success(function (data) {
                        Flash.create('success', 'Employee deleted successfully!', 'custom-class');

                        $scope.loading = false;
                    })

                } else {
                    $scope.loading = false;
                }
            };

            $scope.editEmployee = function (cat) {
                $scope.mode = 'Edit';
                $scope.empval = cat;
                $scope.formVisible = !$scope.formVisible;
            }
    }
  ]);
