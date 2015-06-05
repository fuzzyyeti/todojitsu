angular.module('todoJitsu')
.factory('todoList',['$rootScope','$http','$location','$timeout','diffpatcher',
	function($rootScope,$http,$location,$timeout,diffpatcher){
  var history = [];
	var redo_history = [];
  var stopwatching = false;
  var error = false;
	var list = {
		id: 1,
		last_id: 40,
		todolist: [],
	setPassword : function(passwd){
    var self = this;
		$http.post('/password'+$location.path(),{passwd:encodeURI(passwd)}).success(function(){
		}).error(function(err){ self.error = err;});
	},
	enterPassword : function(passwd){
	  var self = this;	
		var delta;	
		$http.get('/todos'+$location.path()+'/'+encodeURI(passwd)).success(function(list){
			if (list) {
				if (!angular.equals(list,self.todolist)){
				delta = diffpatcher.diff(self.todolist,list)
				self.todolist = diffpatcher.patch(self.todolist,delta);
				}
			} else{
        self.todolist = [];
		}}).error(function(err){
      self.error = err;
    });
	},
	update : function(success_callback){
		var self = this;
		$http.post('/todos' + $location.path(),this.todolist).success(function(){
		success_callback();
	}).error(function(err){self.error = err})},
	redo : function(){
			var saved;
			if (redo_history.length > 0){
				stopwatching = true;
				saved = redo_history.pop();
				history.push(diffpatcher.reverse(saved))
				this.todolist = diffpatcher.patch(this.todolist,saved);
			};
	},
	undo : function(){
			var saved;
			if (history.length > 0){
				stopwatching = true;
				saved = history.pop();
				redo_history.push(diffpatcher.reverse(saved))
				this.todolist = diffpatcher.patch(this.todolist,saved);
			};
		},
	add : function(index,task,date){		
		this.todolist[index].items = [{id: this.newID(),task:task,date:''||date,done:false}].concat(this.todolist[index].items);
		
	},
	newID : function(){
		this.last_id = this.last_id+1
		return this.last_id;
	},
	addCategory : function(name){		
		this.todolist.push({id: this.newID(),category:name,items:[]});
	},
	deleteItem: function(category,item){
		this.todolist[category].items.remove(item);
	},
	deleteCategory: function(category){
		this.todolist.remove(category);
	}};
	$rootScope.$watch(function(){return list.todolist},
					function(newValue,oldValue){
						if (stopwatching === false) {
							history.push(diffpatcher.diff(newValue,oldValue));
							redo_history = [];
              
						} else {
							stopwatching = false;
						}
					},true);
	return list; 
}]);
