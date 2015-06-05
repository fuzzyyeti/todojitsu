angular.module('todoJitsu')
.directive('confirmInput', function() {
return {
				restrict: 'A',
				link: function(scope, element, attrs) {
				var evaluate = function(event){
						scope.$apply(function(){
								scope.$eval(attrs.confirmInput, {'event': event});
						});

						event.preventDefault();
				};
				element.bind("keydown keypress", function(event) {
						if(event.which === 13) {
							evaluate(event);
						}
				});
		}

}
})
