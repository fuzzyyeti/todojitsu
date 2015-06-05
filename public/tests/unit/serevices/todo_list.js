'use strict'

describe('TodoList service', function() {
  var $httpBackend, $rootScope, $timeout, $location, $http, todoList;
  beforeEach(module('todoJitsu'));
  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $timeout = $injector.get('$timeout');
    $location = $injector.get('$location');
    $http = $injector.get('$http');
		todoList = $injector.get('todoList');
	}));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
  it('should create an empty list of todos', inject(function() {
		var todolist = []; 
    expect(angular.equals(todoList.todolist,todolist)).toEqual(true);
  }));
	describe('setPassword method',function(){
		it('should send xhr post psswd to /pssword/:currentpath',function(){
			$location.path('test_path');
			$httpBackend.when('POST', '/password/test_path').respond(200,'');
			$httpBackend.expectPOST('/password/test_path',{passwd:'123'});
			todoList.setPassword('123');
			$httpBackend.flush();
		});
		it('should set self.error to the error message on an error',function(){
			$location.path('test_path');
			$httpBackend.when('POST', '/password/test_path').respond(401,'my_error');
			todoList.setPassword('123');
			$httpBackend.flush();
			expect(todoList.error).toBe('my_error');
		});
	});
	describe('enterPassword method',function(){
		it('should set self.error to the error message on an error',function(){
			$location.path('test_path');
			$httpBackend.when('GET', '/todos/test_path/123').respond(401,'my_error');
			todoList.enterPassword('123');
			$httpBackend.flush();
			expect(todoList.error).toBe('my_error');
		});
		it('should create an empty self.todolist if no list is returned',function() {
			$location.path('test_path');
			$httpBackend.when('GET', '/todos/test_path/123').respond(200);
			todoList.enterPassword('123');
			$httpBackend.flush();
			expect(angular.equals(todoList.todolist,[])).toBe(true);
		});
		it('should create an empty self.todolist if no list is returned',function() {
			$location.path('test_path');
			$httpBackend.when('GET', '/todos/test_path/123').respond(200);
			todoList.enterPassword('123');
			$httpBackend.flush();
			expect(angular.equals(todoList.todolist,[])).toBe(true);
		});
		it('should make self.todolist equal the returned value',function(){
			var date = new Date();
			var returnList = [{
			id: 2,
			category: 'Work',
			items: [{
				id: 3,
				task: 'Go to work again',
				done: false,
				date: date
			}]}];
			$location.path('test_path');
			$httpBackend.when('GET', '/todos/test_path/123').respond(200,returnList);
			todoList.todolist =  [{
			id: 2,
			category: 'Work',
			items: [{
				id: 3,
				task: 'Go to work',
				done: false,
				date: date
			}]}];
			expect(angular.equals(todoList.todolist,returnList)).toBe(false);
			todoList.enterPassword('123');
			$httpBackend.flush();
			expect(angular.equals(todoList.todolist,returnList)).toBe(true);
			//try it again when value doesn't change
			$httpBackend.when('GET', '/todos/test_path/123').respond(200,returnList);
			todoList.enterPassword('123');
			$httpBackend.flush();
			expect(angular.equals(todoList.todolist,returnList)).toBe(true);
		});
		describe('update method',function(){
			it('should set self.error to the error message on an error',function(){
				$location.path('test_path');
				$httpBackend.when('POST', '/todos/test_path').respond(401,'my_error');
				todoList.update();
				$httpBackend.flush();
				expect(todoList.error).toBe('my_error');
			});
		describe('undo method',function(){
			it('should apply the last patch in the undo history list',function(){
				var newTodoList = [{
				id: 1,
				category: 'No Work',
				items: [{
					id: 2,
					task: 'Go to work again',
					done: true,
					date: new Date() 
				}]}];
				var oldTodoList = [{
				id: 2,
				category: 'Work',
				items: [{
					id: 3,
					task: 'Go to work again',
					done: false,
					date: new Date() 
				}]}];
				todoList.todolist = oldTodoList;
				$rootScope.$apply();	
				todoList.todolist = newTodoList;
				$rootScope.$apply();	
				expect(angular.equals(todoList.todolist,newTodoList)).toBe(true);
				todoList.undo();
				expect(angular.equals(todoList.todolist,oldTodoList)).toBe(true);
				
			});
		});	});
		describe('redo method',function(){
			it('should apply the last patch in the redo history list',function(){
				var newTodoList = [{
				id: 1,
				category: 'No Work',
				items: [{
					id: 2,
					task: 'Go to work again',
					done: true,
					date: new Date() 
				}]}];
				var oldTodoList = [{
				id: 2,
				category: 'Work',
				items: [{
					id: 3,
					task: 'Go to work again',
					done: false,
					date: new Date() 
				}]}];
				todoList.todolist = oldTodoList;
				$rootScope.$apply();	
				todoList.todolist = newTodoList;
				$rootScope.$apply();	
				expect(angular.equals(todoList.todolist,newTodoList)).toBe(true);
				todoList.undo();
				expect(angular.equals(todoList.todolist,oldTodoList)).toBe(true);
				todoList.redo();
				expect(angular.equals(todoList.todolist,newTodoList)).toBe(true);
				
			});
		});
	});
});
