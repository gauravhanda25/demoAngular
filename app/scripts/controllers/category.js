'use strict';

angular.module('inventory1App')
  .controller('CategoryCtrl', ['$scope', '$api', '$errors', 'Flash', 
    function($scope, $api, $errors, Flash) {
        
        var defaultForm = {
              name: "",
              desc: "",
            }
      $scope.catval = angular.copy(defaultForm);
      $scope.formVisible = false;

      $api.getCategories().success(function(data) {
        $scope.categories = data;
      });

      $scope.showDeleteConfirmation = function(ev, cat) {
         $scope.catToDelete =  cat;
         $scope.showConfirmation = true;
         $scope.loading = true;  
         ev.preventDefault();
      }

      $scope.showDeleteConfirmationCallback = function(accepted) {
        $scope.showConfirmation = false;

        if (accepted) {
          var index = $scope.categories.indexOf($scope.catToDelete);
          $scope.categories.splice(index, 1);  

          $api.deleteCategory($scope.catToDelete.id).success(function(data) {
              Flash.create('success', 'Category deleted successfully!', 'custom-class');

            $scope.loading = false;
          })

        } else {
          $scope.loading = false;
        }
      };
        
    $scope.editCategory = function(cat){
        $scope.mode = 'Edit';
        $scope.catval = cat;
        $scope.formVisible = !$scope.formVisible;
    }  
    
    $scope.addCat = function(){
        var defaultForm = {
              name: "",
              desc: "",
            }
        //$scope.catval = angular.copy(defaultForm);
        $scope.mode = 'Add';
        $scope.formVisible = !$scope.formVisible;
    }
    }
  ]);
