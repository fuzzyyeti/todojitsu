angular.module('todoJitsu')
.controller('TodoItemCtrl',function($scope,$timeout,$rootScope,todoList){
	//	$scope.done = false;
    $scope.clicked = false;
    $scope.focused = false;
		$scope.$watch(function(){return todoList.todolist[$scope.listIndex].items[$scope.$index].done},function(value){
			if (value){
				$scope.done = true;
			} else {
				$scope.done = false;	
			}
		});
		$scope.$watch('done',function(){
			if ($scope.done){
				//console.log($scope.listIndex,$scope.$index,$scope.done);
				//console.log(todoList.todolist[$scope.listIndex].items[$scope.$index].done);
				//console.log('should be crossing');
				$scope.crossOut={'text-decoration': 'line-through'}
				todoList.todolist[$scope.listIndex].items[$scope.$index].done = true;
			} else {
				//console.log($scope.listIndex,$scope.$index,$scope.done);
				//console.log(todoList.todolist[$scope.listIndex].items[$scope.$index].done);
				//console.log('should be uncrossing');
				$scope.crossOut={};
				todoList.todolist[$scope.listIndex].items[$scope.$index].done = false;
			}
		});	
    $scope.deleteItem = function(){
			todoList.deleteItem($scope.listIndex,$scope.$index);
      ////console.log('delete item!');
    };
});
