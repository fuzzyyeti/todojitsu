angular.module('todoJitsu')
.controller('TodoCtrl',function($scope,$timeout,todoList,$location,$interval){
	var dont_update = false;
  $scope.message = '';
  $scope.enterPasswordValue = '';
	$scope.newCategory = {name:""};
	$scope.setShowSetPassword = function(){
		$scope.showSetPassword = true;
	};
  $scope.setPassword = function(){
    todoList.setPassword($scope.setPasswordValue)
    $scope.showSetPassword = false;
    $scope.setPasswordValue = '';
    $scope.message='';
  };
  $scope.enterPassword = function(){
    todoList.enterPassword($scope.enterPasswordValue)
    $scope.showEnterPassword = false;
    $scope.message='';
  };
	$scope.update = function(){
		todoList.update();
	};
	$scope.checkerboxer = 'ok';
	$scope.clearDone = function(){
		angular.forEach(todoList.todolist,function(value,category){
			angular.forEach(todoList.todolist[category].items,function(value,item){
				if (todoList.todolist[category].items[item].done){
					todoList.todolist[category].items[item] = null;
				};
			});
			todoList.todolist[category].items.clean(null);
		});
	};
	$scope.sortableOptions = {
		placeholder: "todo",
		connectWith: ".connect-lists"
	};
	$scope.addNewCategory = function(){
		if ($scope.newCategory.name) {
			todoList.addCategory($scope.newCategory.name);
			$scope.newCategory.name = '';
		};
	};
	
	$scope.todos = todoList.todolist;
	$scope.redo = function(){
		todoList.redo();
  };
	$scope.undo = function(){
		todoList.undo();
  };
  var checkUpdate = function(){
    if (todoList.todolist && todoList.todolist instanceof Array){
      if (todoList.todolist.length != 0){
				if (!dont_update){
					return true;
				}
      }
    }
  };
  $scope.$watch(function(){return todoList.error},function(newValue,oldValue){
    if(newValue != oldValue){
      if (todoList.error == 'password already set'){
        $scope.message=todoList.error;
        todoList.error='';
        $scope.showSetPassword = true;
        $timeout(function(){
         $scope.showSetPassword = false;
        },1000);
      }
      if (todoList.error == 'no password'){
        $scope.showEnterPassword = true;
      }
      if (todoList.error == 'bad password'){
        $scope.showEnterPassword = true;
        $scope.message=todoList.error;
        todoList.error='';
      }
    }
  });
  $scope.$watch('todos',function(newValue,oldValue){
    if(!angular.equals(newValue,oldValue)){
      if (checkUpdate()){
        dont_update = true;
        $timeout(function(){
          todoList.update(function(){
            dont_update = false;
          });
        },5000);
      }
    }
  },true);
	$scope.$watch(function(){return todoList.todolist},function(){
    $scope.todos = todoList.todolist;
	},true);
	function tick() {
		if (!dont_update){
			todoList.enterPassword($scope.enterPasswordValue)
		}
	};
	tick();	
	$interval(tick,30000);
})
