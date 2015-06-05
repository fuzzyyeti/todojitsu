angular.module('todoJitsu')
.controller('CategoryCtrl',function($scope,todoList,$rootScope,$timeout){
	$scope.test = 'pineapple';
  $scope.listIndex = $scope.$index;
	$scope.deleteCategory = function(){
		////console.log('delete category!');
		todoList.deleteCategory($scope.$index);
	};
	////console.log('making sortable options');
	$scope.addNewItem = function(){
		////console.log('adding ', $scope.$index)
		////console.log($scope.todolist);
		if ($scope.newItem) {
			todoList.add($scope.$index,$scope.newItem,null);
			$scope.newItem = '';
		};
	};
})
