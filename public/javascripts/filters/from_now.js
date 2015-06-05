angular.module('todoJitsu')
.filter('fromNow', function() {
	return function(date){
		if (date instanceof Date){
			return date.toDateString();
		} else {
			return '';
	}
  return '';
	}
});
