angular.module('todoJitsu')
.directive('checkBox',function(){
	return {
		restrict: 'E',
		templateUrl:'/views/checkbox.tpl.html',
		scope: {
			boxState: '='	
		},
		link: function(scope){
			scope.box_image = "glyphicons_153_unchecked.png";
			//scope.boxState = false;
			scope.$watch('boxState',function(value){
				if (value){
					scope.box_image = "glyphicons_152_check.png";
				} else {
					scope.box_image = "glyphicons_153_unchecked.png";
				}
			})
			scope.toggle = function(){
				if (scope.box_image === "glyphicons_152_check.png"){
					scope.box_image = "glyphicons_153_unchecked.png";
					scope.boxState = false;
				} else {
					scope.box_image = "glyphicons_152_check.png";
					scope.boxState = true;
				}
			};
		}
}
})
