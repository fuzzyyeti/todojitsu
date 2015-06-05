angular.module('todoJitsu')
.factory('diffpatcher',function(){
	var diffpatcher = jsondiffpatch.create({
			objectHash: function(obj) {
					return obj.id;
			}
	});
	return diffpatcher
});
