'use strict';
Array.prototype.remove = function(from,to){
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
}
Array.prototype.compare = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].compare(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

window.addEventListener('load', function() {
FastClick.attach(document.body);
}, false);

angular.module('todoJitsu', [
  'ngRoute',
	'ngTouch',
	'ngAnimate',
	'ui.sortable'
])
.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider.
		when('/intro', {
			templateUrl: '/views/intro.tpl.html',
		}).
		when('/', {
			templateUrl: '/views/intro.tpl.html',
		}).
		otherwise({
			templateUrl: '/views/todo.tpl.html',
		});
		$locationProvider.html5Mode(true);
	}
]);

