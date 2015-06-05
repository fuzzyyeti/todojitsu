angular.module('todoJitsu')
.directive('editableCategory',function($timeout,$parse){
  return {
    restrict: 'E',
    scope: {todoModel: '=',
            deleteCategory: '&'},
    templateUrl: '/views/editable_category.tpl.html',
    replace: false,
    link: function(scope, element, attr, ctrl) {
      element.find('.glyphicon-remove').bind('click',function(el){
        var fn = $parse(attr['deleteCategory']);
        scope.$apply(function() {
          fn(scope, {$event:el});
        });
      });
			scope.$watch('todoModel',function(){
					var lht = parseInt(element.find('textarea').css('lineHeight'),10);
					element.find("textarea").css('height','auto');
					var lines = (element.find('textarea')[0]).scrollHeight / lht;
					element.find("textarea").css('height',(lht*lines).toString()+'px');
			});
    }
  };
})
