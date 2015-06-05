angular.module('todoJitsu')
.directive('editableTodo',function($timeout,$parse){
  return {
    restrict: 'E',
    scope: {todoModel: '=',
						etStyle: '=',
						dueDate: '=',
						boxState: '=',
            deleteItem: '&'},
    templateUrl: '/views/editable_todo.tpl.html',
    replace: false,
    link: function(scope, element, attr, ctrl) {
			scope.swiped = false;
			scope.swipe = function(){
				if (scope.swiped){
					scope.swiped = false;
				} else {
					scope.swiped = true;
				}
			}
			scope.click = function(){
		   if (scope.boxState) {
					scope.boxState = false;	
				} else {
					scope.boxState = true;	
			}		
			};
			scope.$watch('todoModel',function(){
					var lht = parseInt(element.find('textarea').css('lineHeight'),10);
					element.find("textarea").css('height','auto');
					var lines = (element.find('textarea')[0]).scrollHeight / lht;
					element.find("textarea").css('height',(lht*lines).toString()+'px');
			});
      element.find('.remove').bind('click',function(el){
        var fn = $parse(attr['deleteItem']);
        scope.$apply(function() {
          fn(scope, {$event:el});
        });
      });
    }
  };
})
