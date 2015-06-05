angular.module('todoJitsu')
.directive('password' , function($compile) {
	return {
		restrict: 'E',
    transclude: true,
		scope: { 
			show: '=',
			value: '=',
      message: '=',
      confirmInput: '&'
		},
    replace: true,
		templateUrl: '/views/password.tpl.html',
		link: function(scope,elem,attrs){
      scope.hideModal = function() {
        scope.show = false;
      };
			scope.confirm = function() {
				scope.hideModal();
				scope.confirmInput();
			}
			scope.$watch('show',function(){
				if (scope.show){
						elem.find('input').focus();
					};
			});
		}	
}})
